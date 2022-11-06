import MiniSearch from 'minisearch'

const DATA = {
  userSets: []
}
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
const createList = () => {
  console.log('createList', DATA.userSets)
  disableCreateListButton()
  const userSets = DATA.userSets.map(i => {
    const set = DATA.sets.find(s => s.set_num === i)
    set.inventory = DATA.inventories.find(i => i.set_num === set.set_num)
    set.parts = DATA.inventory_parts.filter(p => p.inventory_id === set.inventory.id)
    set.parts_total = set.parts.reduce((accumulator, p) => {
      return accumulator + parseInt(p.quantity)
    }, 0)

    return set
  })
  console.log('userSets', userSets)
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

const removeSet = (setNum) => {
  console.log('removeSet', setNum)
  DATA.userSets = DATA.userSets.filter(s => s !== setNum)
  refreshUserSets()
  saveUserSets()
}

const removeSetClickHandler = (e) => {
  const result = e.target.closest('.item')
  removeSet(result.getAttribute('data-set-num'))
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

  const itemsHtml = DATA.userSets.map(i => createItemHtml(DATA.sets.find(s => s.set_num === i), 'Remove')).join('')
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
const addSet = (setNum) => {
  console.log('addSet', setNum)
  if (!DATA.userSets.includes(setNum)) {
    DATA.userSets.push(setNum)
    refreshUserSets()
    saveUserSets()
  }
}

const addSetClickHandler = (e) => {
  const result = e.target.closest('.item')
  addSet(result.getAttribute('data-set-num'))
}
const createItemHtml = (r, cta) => {
  return `
  <div class="col-2 item" data-set-num="${r.set_num}" data-name="${r.name}" data-img-url="${r.img_url}">
    <img class="img-fluid" src="${r.img_url}"> 
    <p>${r.name} - ${r.set_num}</p>
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
