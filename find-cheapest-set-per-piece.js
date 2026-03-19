const { readFileSync } = require('fs')
const { join } = require('path')

const BASE_URL = 'https://www.yottabrick.com/_next/data/tqiagFZTZY1qCy8F1jfU4/en-GB/browse.json'

function loadPartsMap () {
  const csv = readFileSync(join(__dirname, 'sets.technic.csv'), 'utf8')
  const lines = csv.split('\n').slice(1) // skip header
  const map = new Map()
  for (const line of lines) {
    if (!line.trim()) continue
    // set_num,name,year,theme_id,num_parts,img_url
    const [setNum, , , , numParts] = line.split(',')
    const id = parseInt(setNum.split('-')[0], 10)
    if (!isNaN(id) && numParts) map.set(id, parseInt(numParts, 10))
  }
  return map
}

async function fetchPage (page) {
  const url = `${BASE_URL}?tags=Technic&page=${page}`
  console.error(`Fetching page ${page}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for page ${page}`)
  return res.json()
}

async function main () {
  const partsMap = loadPartsMap()
  const allSets = []
  let page = 1

  while (true) {
    const data = await fetchPage(page)
    const sets = data?.pageProps?.sets?.sets
    if (!sets || sets.length === 0) break
    allSets.push(...sets)
    page++
  }

  console.error(`Fetched ${allSets.length} sets across ${page - 1} pages`)

  // Enrich with parts data and compute cost per part
  const enriched = allSets.map(s => {
    const parts = partsMap.get(s.legoSetId) || 0
    const priceGBP = s.price / 100
    const costPerPart = parts > 0 ? priceGBP / parts : Infinity
    return { ...s, parts, priceGBP, costPerPart }
  })

  // Sort by cost per part, filter out sets with no parts data
  const sorted = enriched
    .filter(s => s.parts > 0 && s.price !== null && s.price > 0)
    .sort((a, b) => a.costPerPart - b.costPerPart)
    .slice(0, 30)

  console.log('\nTop 30 Cheapest Technic Sets by Cost per Part\n')
  sorted.forEach((s, i) => {
    const cpp = `${s.costPerPart.toFixed(3)}p/part`
    console.log(`${String(i + 1).padStart(2)}. £${s.priceGBP.toFixed(2).padStart(7)} | ${String(s.parts).padStart(5)} parts | ${cpp.padStart(12)} | ${s.legoSetId} - ${s.name} @ ${s.shopName}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
