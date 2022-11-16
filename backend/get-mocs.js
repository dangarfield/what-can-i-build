import * as puppeteer from 'puppeteer'
import bluebird from 'bluebird'
import fs from 'fs'
import path from 'path'

const withBrowser = async (fn) => {
  const browser = await puppeteer.launch({/* ... */})
  try {
    return await fn(browser)
  } finally {
    await browser.close()
  }
}

const withPage = (browser) => async (fn) => {
  const page = await browser.newPage()

  await page.setRequestInterception(true)
  page.on('request', request => {
    if (request.resourceType() === 'image') {
      request.abort()
    } else {
      request.continue()
    }
  })
  try {
    return await fn(page)
  } finally {
    await page.close()
  }
}

export const getAllMOCs = async (MOC_DATA_PATH) => {
  // const mocNos = [128500, 127239, 128169, 128382, 127451, 12745100, 98936, 127897, 126294, 127454]
  const mocNos = [...Array(128708 + 1).keys()]
  //   const results = []
  const results = await withBrowser(async (browser) => {
    return bluebird.map(mocNos, async (mocNo, i, length) => {
      const mocPath = path.join(MOC_DATA_PATH, `${mocNo}.csv`)
      // console.log('getOneMOC', i, 'of', length-1, '->', mocNo, 'INIT')
      if (fs.existsSync(mocPath)) {
        const data = fs.readFileSync(mocPath, 'utf-8')
        if (data.startsWith('invalidMOCNo')) {
          // console.log('getOneMOC', i, 'of', length-1, '->', mocNo, 'Invalid MOC No')
          return
        } else if (data.startsWith('m,')) {
          // console.log('getOneMOC', i, 'of', length-1, '->', mocNo, 'Already Complete')
          return
        }
      }
      return withPage(browser)(async (page) => {
        try {
          console.log('getOneMOC', i, 'of', length - 1, '->', mocNo, 'START')
          const dataFile = await getOneMOC(page, mocNo)
          console.log('getOneMOC', i, 'of', length - 1, '->', mocNo, 'END')
          fs.writeFileSync(mocPath, dataFile)
        } catch (error) {
          console.log('getOneMOC', i, 'of', length - 1, '->', mocNo, 'error', error)
        }
      })
    }, { concurrency: 1 })
  })
  console.log('MOCs downloaded')
  return results
}
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getOneMOC = async (page, mocNo) => {
  // if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots')
  const mocUrl = `https://rebrickable.com/mocs/MOC-${mocNo}/a/b/#parts`
  await page.goto(mocUrl, { waitUntil: ['domcontentloaded'] })

  // await page.screenshot({ path: `screenshots/moc-${mocNo}-1.png` })
  await page.waitForSelector('h2')
  const h2 = await page.$('h2')
  const h2Text = await (await h2.getProperty('textContent')).jsonValue()

  if (h2Text.includes('404')) {
    return 'invalidMOCNo\n'
  }
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight)
  })
  // await page.screenshot({ path: `screenshots/moc-${mocNo}-1.png` })
  await page.focus('.tab-content')

  // await page.screenshot({ path: `screenshots/moc-${mocNo}-2.png` })
  let jsPartData = await page.$('.js-part-data')
  while (jsPartData === null) {
    console.log('reloading', mocNo)
    await sleep(3000)
    // await page.screenshot({ path: `screenshots/moc-${mocNo}-reload.png` })
    await page.reload({ waitUntil: ['domcontentloaded'] })
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight)
    })
    // await page.screenshot({ path: `screenshots/moc-${mocNo}-1.png` })
    await page.focus('.tab-content')
    jsPartData = await page.$('.js-part-data')
  }
  // console.log('jsPartData', mocNo, jsPartData)
  await page.waitForSelector('.js-part-data')

  const set = await page.evaluate(() => {
    try {
      const parts = []
      const items = document.querySelectorAll('.js-part-data')
      for (const item of items) {
        const partText = item.querySelector('.part-text')
        const itemSplit = partText.textContent.split(' x ').map(t => t.trim())
        const image = item.querySelector('img')

        let imgUrl = image.getAttribute('data-src').replace('https://cdn.rebrickable.com/media/thumbs/parts/', '')
        if (imgUrl.includes('ldraw')) imgUrl = imgUrl.split('.png')[0] + '.png'
        if (imgUrl.includes('elements')) imgUrl = imgUrl.split('.jpg')[0] + '.jpg'
        parts.push({
          part_num: itemSplit[1],
          quantity: parseInt(itemSplit[0]),
          color: item.getAttribute('data-color_name'),
          is_spare: false,
          img_url: imgUrl
        })
      }
      const instructionCount = document.querySelectorAll('.col-lg-4.col-md-5.col-sm-6 a[rel="noopener"]').length +
      document.querySelectorAll('.col-lg-4.col-md-5.col-sm-6 .pull-left a').length

      const setTexts = document.querySelector('.text-center.mb-30').textContent.split('•').map(t => t.trim())
      const set = {
        set_num: setTexts[0],
        name: document.querySelector('h4.text-center.mb-10').textContent.split('by')[0].trim(),
        num_parts: parts.length,
        parts_total: parts.reduce(function (acc, obj) { return acc + obj.quantity }, 0),
        theme: setTexts[2],
        parts,
        instructionCount
      }
      return set
    } catch (error) {
      return { error: error.stack }
    }
  })
  if (set.error) {
    return `error\n${set.error.toString()}`
  }
  // image - https://cdn.rebrickable.com/media/thumbs/mocs/moc-128500.jpg/1000x800.jpg
  let dataFile = `m,${set.set_num},${set.name},${set.num_parts},${set.parts_total},${set.theme},${set.instructionCount}\n`
  for (const part of set.parts) {
    dataFile += `${part.part_num},${part.quantity},${part.color},${part.is_spare},${part.img_url}\n`
  }
  return dataFile
}
