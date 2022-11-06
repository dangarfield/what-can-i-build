import MiniSearch from 'minisearch'

const DATA = {}
const setSearch = new MiniSearch({ idField: 'set_num', fields: ['set_num', 'name'], storeFields: ['set_num', 'name', 'img_url'] })

const setStatus = (status) => {
  document.querySelector('.status').textContent = status
}
const fetchData = async () => {
  setStatus('Loading data..')
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
    const req = await window.fetch(`data/${file}.json`)
    DATA[file] = await req.json()
  }
  setStatus('Data loaded')
  console.log('Data loaded', DATA)
}

const addSet = (setNum) => {
  console.log('addSet', setNum)
}

const addSetClickHandler = (e) => {
  addSet(e.target.closest('.result').getAttribute('data-result'))
}
const bindAddSetOptions = async () => {
  setStatus('Adding set select options')
  setSearch.addAll(DATA.sets)
  console.log('results', setSearch.search('tractor'), setSearch.search('2621-2'))
  const resultArea = document.querySelector('.user-inventory-select-results')
  document.querySelector('.user-inventory-select').addEventListener('keyup', function (e) {
    const searchTerm = encodeURIComponent(this.value)
    const results = setSearch.search(searchTerm).slice(0, 12)

    const resultHtml = results.map(r => `
    <div class="col-2 result" data-result="${r.set_num}">
      <img class="img-fluid" src="${r.img_url}"> 
      <p>${r.name} - ${r.set_num}</p>
      <div class="result-add">
        <button type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
    `).join('')
    console.log('results', searchTerm, results)

    // Remove previously added click handlers
    document.querySelectorAll('.user-inventory-select-results .result').forEach((drop) => {
      drop.removeEventListener('click', addSetClickHandler)
    })
    // Set HTML
    resultArea.innerHTML = resultHtml
    // Add new click handlers
    document.querySelectorAll('.user-inventory-select-results .result').forEach((result) => {
      result.addEventListener('click', addSetClickHandler)
    })
  })
}
const init = async () => {
  console.log('init')

  await fetchData()
  await bindAddSetOptions()
  setStatus('Ready')
}

init()
