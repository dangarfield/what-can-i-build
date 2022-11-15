import fs from 'fs'
import path from 'path'
import got from 'got'
import zlib from 'zlib'
import { getAllMOCs } from './get-mocs.js'
const RAW_DATA_PATH = path.join('raw-data')
const MOC_DATA_PATH = path.join('moc-data')
const DATA_PATH = path.join('..', 'frontend', '_static', 'data')

const CSVtoArray = (text) => {
  const ret = ['']; let i = 0; let p = ''; let s = true
  for (let l in text) {
    l = text[l]
    if (l === '"') {
      s = !s
      if (p === '"') {
        ret[i] += '"'
        l = '-'
      } else if (p === '') { l = '-' }
    } else if (s && l === ',') { l = ret[++i] = '' } else { ret[i] += l }
    p = l
  }
  return ret
}

const downloadAndUnzipRawData = async () => {
  const dataUrls = [
    'https://cdn.rebrickable.com/media/downloads/themes.csv.gz?1667635680.3222456',
    'https://cdn.rebrickable.com/media/downloads/colors.csv.gz?1667635680.4582458',
    'https://cdn.rebrickable.com/media/downloads/part_categories.csv.gz?1667635680.590246',
    'https://cdn.rebrickable.com/media/downloads/parts.csv.gz?1667635681.1462464',
    'https://cdn.rebrickable.com/media/downloads/part_relationships.csv.gz?1667635688.4982529',
    'https://cdn.rebrickable.com/media/downloads/elements.csv.gz?1667635681.5502467',
    'https://cdn.rebrickable.com/media/downloads/sets.csv.gz?1667635682.3382473',
    'https://cdn.rebrickable.com/media/downloads/minifigs.csv.gz?1667635682.6862478',
    'https://cdn.rebrickable.com/media/downloads/inventories.csv.gz?1667635681.934247',
    'https://cdn.rebrickable.com/media/downloads/inventory_parts.csv.gz?1667635687.710252',
    'https://cdn.rebrickable.com/media/downloads/inventory_sets.csv.gz?1667635687.9662523',
    'https://cdn.rebrickable.com/media/downloads/inventory_minifigs.csv.gz?1667635688.2502525'
  ]
  if (!fs.existsSync(RAW_DATA_PATH)) {
    fs.mkdirSync(RAW_DATA_PATH)
  }
  for (const dataUrl of dataUrls) {
    const fileName = `${dataUrl.split('downloads/')[1].split('.')[0]}.json`
    const filePath = path.join(RAW_DATA_PATH, fileName)

    if (fs.existsSync(filePath)) {
      console.log('Already exists:', filePath)
      continue
    }
    console.log('Downloading:', filePath)
    const { body } = await got(dataUrl, {
      responseType: 'buffer'
    })
    const f = zlib.gunzipSync(body).toString('utf-8').split('\n')

    fs.writeFileSync(filePath.replace('.json', '.csv'), f.join('\n'))

    const headers = f.shift().split(',')
    const dataFile = []
    for (const d of f) {
      const tmp = {}
      let row = d.split(',')
      if (d.includes('"')) {
        row = CSVtoArray(d)
      }
      if (!Array.isArray(row)) {
        const d2 = d.replaceAll('""', '\'')
        console.log('row', row, d, d2)
      }
      if (row.length <= 1) {
        continue
      }
      for (let i = 0; i < headers.length; i++) {
        tmp[headers[i]] = row[i]
      }
      dataFile.push(tmp)
    }

    fs.writeFileSync(filePath, JSON.stringify(dataFile))

    // console.log('Saved:', filePath)
  }
}

const processSets = async () => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH)
  }
  const processSetsPath = path.join(DATA_PATH, 'processed_sets.csv')
  if (!fs.existsSync(processSetsPath)) {
    // console.log('Already processed')
    const DATA = {}
    const files = [
      'themes',
      'colors',
      'part_categories',
      'parts',
      'part_relationships',
      'elements',
      'sets',
      'minifigs',
      'inventories',
      'inventory_parts',
      'inventory_sets',
      'inventory_minifigs'
    ]

    console.log('files', files)
    for (const file of files) {
      DATA[file] = JSON.parse(fs.readFileSync(path.join(RAW_DATA_PATH, `${file}.json`), 'utf-8'))
    }
    // DATA.sets = DATA.sets.filter(s => s.theme_id === '1')// .slice(0, 1)
    // DATA.sets = DATA.sets.slice(19890)
    let mainDataFile = ''
    for (let i = 0; i < DATA.sets.length; i++) {
      const set = DATA.sets[i]
      if ((i + 1) % 100 === 0) {
        console.log('set', (i + 1), 'of', DATA.sets.length, set)
      }
      let tmpThemeId = set.theme_id
      set.theme = []
      while (tmpThemeId !== null) {
        const theme = DATA.themes.find(t => t.id === tmpThemeId)
        set.theme.unshift(theme.name)
        if (theme.parent_id === '') {
          tmpThemeId = null
          break
        } else {
          tmpThemeId = theme.parent_id
        }
      }
      set.theme = set.theme.join(' > ')
      set.inventory = DATA.inventories.find(i => i.set_num === set.set_num)
      set.parts = DATA.inventory_parts.filter(p => p.inventory_id === set.inventory.id)
      set.parts_total = set.parts.reduce((acc, p) => acc + parseInt(p.quantity), 0)
      mainDataFile += `s,${set.set_num},${set.name},${set.num_parts},${set.parts_total},${set.theme}\n`
      for (const part of set.parts) {
        part.color = DATA.colors.find(c => c.id === part.color_id).name
        mainDataFile += `${part.part_num},${part.quantity},${part.color},${part.is_spare},${part.img_url.replace('https://cdn.rebrickable.com/media/parts/', '')}\n`
      }
    }
    mainDataFile = mainDataFile.slice(0, -1)
    fs.writeFileSync(processSetsPath, mainDataFile)
    // fs.writeFileSync(processSetsGzPath, zlib.gzipSync(Buffer.from(mainDataFile, 'utf-8')))
    console.log('Written uncompressed', mainDataFile.length)
  } else {
    console.log('Already processed')
  }
}
const downloadMOCs = async () => {
  if (!fs.existsSync(MOC_DATA_PATH)) {
    fs.mkdirSync(MOC_DATA_PATH)
  }
  await getAllMOCs(MOC_DATA_PATH)
}
const processMOCs = async () => {
  const processMocsPath = path.join(DATA_PATH, 'processed_mocs.csv')
  let mainDataFile = ''
  const mocFiles = fs.readdirSync(MOC_DATA_PATH)
  for (const mocFile of mocFiles) {
    const mocData = fs.readFileSync(path.join(MOC_DATA_PATH, mocFile), 'utf-8')
    if (mocData.startsWith('m,')) {
      mainDataFile += mocData
    }
  }
  mainDataFile = mainDataFile.slice(0, -1)
  fs.writeFileSync(processMocsPath, mainDataFile)
}
const createGzipFile = async () => {
  const processSetsPath = path.join(DATA_PATH, 'processed_sets.csv')
  const processMocsPath = path.join(DATA_PATH, 'processed_mocs.csv')
  const processSetsGzPath = path.join(DATA_PATH, 'processed_data.csv.gz')
  const setData = fs.readFileSync(processSetsPath, 'utf-8')
  const mocData = fs.readFileSync(processMocsPath, 'utf-8')
  const data = setData + '\n' + mocData
  // console.log('data', data)
  fs.writeFileSync(processSetsGzPath, zlib.gzipSync(Buffer.from(data, 'utf-8')))
}
const init = async () => {
  await downloadAndUnzipRawData()
  await downloadMOCs()
  await processSets()
  await processMOCs()
  await createGzipFile()
}

init()
