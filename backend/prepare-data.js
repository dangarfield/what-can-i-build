import fs from 'fs'
import path from 'path'
import got from 'got'
import zlib from 'zlib'

const DATA_PATH = path.join('..', 'frontend', '_static', 'data')

const downloadAndUnzip = async () => {
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
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH)
  }
  for (const dataUrl of dataUrls) {
    const fileName = `${dataUrl.split('downloads/')[1].split('.')[0]}.json`
    const filePath = path.join(DATA_PATH, fileName)

    if (fs.existsSync(filePath)) {
      // console.log('Already exists:', filePath)
      continue
    }
    console.log('Downloading:', filePath)
    const { body } = await got(dataUrl, {
      responseType: 'buffer'
    })
    const f = zlib.gunzipSync(body).toString('utf-8').split('\n')
    const headers = f.shift().split(',')
    const dataFile = []
    f.forEach(function (d) {
      const tmp = {}
      const row = d.split(',')
      for (let i = 0; i < headers.length; i++) {
        tmp[headers[i]] = row[i]
      }
      dataFile.push(tmp)
    })

    fs.writeFileSync(filePath, JSON.stringify(dataFile))

    // console.log('Saved:', filePath)
  }
}

const test = async () => {
  const sets = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'sets.json'), 'utf-8'))
  const inventorySets = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'inventory_sets.json'), 'utf-8'))
  const inventories = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'inventories.json'), 'utf-8'))
  const inventoryParts = JSON.parse(fs.readFileSync(path.join(DATA_PATH, 'inventory_parts.json'), 'utf-8'))
  //   console.log('sets', sets, sets.length)

  const setNum = '8069-1'

  const set = sets.find(s => s.set_num === setNum)
  const inventorySet = inventorySets.filter(s => s.set_num === setNum)
  const inventory = inventories.filter(s => s.set_num === setNum)
  const inventoryPart = inventoryParts.filter(s => s.inventory_id === inventory[0].id)
  console.log('set', set)
  console.log('inventorySet', inventorySet, inventorySet.length)
  console.log('inventory', inventory, inventory.length, inventory[0].id)
  console.log('inventoryPart', inventoryPart, inventoryPart.length)
}
const init = async () => {
  await downloadAndUnzip()
  await test()
}

init()
