import MiniSearch from 'minisearch'

const DATA = {
  userSets: []
}
const setSearch = new MiniSearch({ idField: 'id', fields: ['id', 'name'], storeFields: ['id', 'name'] })

const setStatus = (status) => {
  document.querySelector('.status').textContent = status
}
const fetchData = async () => {
  setStatus('Loading data..')
  // const files = [
  //   'themes',
  //   'colors',
  //   'part_categories',
  //   'parts',
  //   'part_relationships',
  //   'elements',
  //   'sets',
  //   'minifigs',
  //   'inventories',
  //   'inventory_parts',
  //   'inventory_sets',
  //   'inventory_minifigs'
  // ]
  // console.log('files', files)
  // for (const file of files) {
  //   const req = await window.fetch(`data/${file}.json`)
  //   DATA[file] = await req.json()
  // }
  // setStatus('Processing data')
  // console.log('Data loaded', DATA)

  DATA.sets = (await (await window.fetch('data/processed_sets.csv')).text()).substring(2).split('\ns,').map(s => {
    const parts = s.split('\n')
    const setDetails = parts.shift().split(',')
    const partsObj = parts.map(p => {
      const partDetails = p.split(',')
      return { partId: partDetails[0], quantity: parseInt(partDetails[1]), color: partDetails[2], isSpare: partDetails[3] === 't' }
    })
    return { id: setDetails[0], name: setDetails[1], partsUsed: parseInt(setDetails[2]), partsTotal: parseInt(setDetails[3]), parts: partsObj }
  })
  console.log('rawSetData', DATA.sets)

  setStatus('Data loaded')
  console.log('Data processed', DATA)
}
const createList = () => {
  console.log('createList', DATA.userSets)
  // disableCreateListButton()
  const userSets = DATA.userSets.map(i => {
    const set = DATA.sets.find(s => s.id === i)
    return set
  })
  console.log('userSets', userSets)

  setStatus('Creating list')
  // Can speed up the process by allowing user to select their 'theme'
  // const allSets = DATA.sets.filter(s => s.theme_id === '1')
  // for (const set of allSets) {
  //   set.inventory = DATA.inventories.find(i => i.set_num === set.set_num)
  //   set.parts = DATA.inventory_parts.filter(p => p.inventory_id === set.inventory.id)
  // }
  // setStatus('Data loaded')
  // console.log('Data processed', allSets)

  // console.log('allSets', allSets)
}
const bindCreateListButton = () => {
  document.querySelector('.create-list').addEventListener('click', createList)
}
const enableCreateListButton = () => {
  document.querySelector('.create-list').classList.remove('disabled')
}
const disableCreateListButton = () => {
  document.querySelector('.create-list').classList.add('disabled')
}

const removeSet = (id) => {
  console.log('removeSet', id)
  DATA.userSets = DATA.userSets.filter(s => s !== id)
  refreshUserSets()
  saveUserSets()
}

const removeSetClickHandler = (e) => {
  const result = e.target.closest('.item')
  removeSet(result.getAttribute('data-set-id'))
}

const loadUserSets = () => {
  const storageItem = window.localStorage.getItem('what-can-i-build-user-sets')
  if (storageItem === null) {
    return
  }
  DATA.userSets = JSON.parse(storageItem)
  refreshUserSets()
}
const saveUserSets = () => {
  window.localStorage.setItem('what-can-i-build-user-sets', JSON.stringify(DATA.userSets))
}
const refreshUserSets = () => {
  const itemsArea = document.querySelector('.user-inventory')

  const itemsHtml = DATA.userSets.map(i => createItemHtml(DATA.sets.find(s => s.id === i), 'Remove')).join('')
  console.log('refreshUserSets', DATA.userSets)

  // Remove previously added click handlers
  document.querySelectorAll('.user-inventory .item').forEach((drop) => {
    drop.removeEventListener('click', removeSetClickHandler)
  })
  // Set HTML
  itemsArea.innerHTML = itemsHtml
  // Add new click handlers
  document.querySelectorAll('.user-inventory .item').forEach((result) => {
    result.addEventListener('click', removeSetClickHandler)
  })

  if (DATA.userSets.length > 0) {
    document.querySelector('.user-inventory-count').textContent = DATA.userSets.length
    enableCreateListButton()
  } else {
    document.querySelector('.user-inventory-count').textContent = ''
    disableCreateListButton()
  }
}
const addSet = (id) => {
  console.log('addSet', id)
  if (!DATA.userSets.includes(id)) {
    DATA.userSets.push(id)
    refreshUserSets()
    saveUserSets()
  }
}

const addSetClickHandler = (e) => {
  const result = e.target.closest('.item')
  addSet(result.getAttribute('data-set-id'))
}
const createItemHtml = (r, cta) => {
  return `
  <div class="col-md-2 col-4 item" data-set-id="${r.id}">
    <img class="img-fluid" src="https://cdn.rebrickable.com/media/sets/${r.id.toLowerCase()}.jpg"> 
    <p>${r.name} - ${r.id}</p>
    <div class="item-add">
      <button type="button" class="btn btn-primary">${cta}</button>
    </div>
  </div>
  `
}
const bindAddSetOptions = async () => {
  setStatus('Adding set select options')
  setSearch.addAll(DATA.sets)
  // console.log('results', setSearch.search('tractor'), setSearch.search('2621-2'))
  const resultArea = document.querySelector('.user-inventory-select-results')
  document.querySelector('.user-inventory-select').addEventListener('keyup', function (e) {
    const searchTerm = encodeURIComponent(this.value)
    const results = setSearch.search(searchTerm).slice(0, 18)

    const resultHtml = results.map(r => createItemHtml(r, 'Add')).join('')
    console.log('results', searchTerm, results)

    // Remove previously added click handlers
    document.querySelectorAll('.user-inventory-select-results .item').forEach((drop) => {
      drop.removeEventListener('click', addSetClickHandler)
    })
    // Set HTML
    resultArea.innerHTML = resultHtml
    // Add new click handlers
    document.querySelectorAll('.user-inventory-select-results .item').forEach((result) => {
      result.addEventListener('click', addSetClickHandler)
    })
  })
}
const init = async () => {
  console.log('init')
  await fetchData()
  loadUserSets()
  await bindAddSetOptions()
  bindCreateListButton()
  enableCreateListButton()
  setStatus('Ready')
}

init()
