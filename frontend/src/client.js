import Modal from 'bootstrap/js/dist/modal.js'
import MiniSearch from 'minisearch'
import { ungzip } from 'pako'

const DATA = {
  userSets: [],
  userParts: new Map()
}
const setSearch = new MiniSearch({ idField: 'id', fields: ['id', 'name'], storeFields: ['id', 'name'] })
const modal = new Modal(document.querySelector('.modal'), {})

const setStatus = (status) => {
  document.querySelector('.status').textContent = status
}
const fetchData = async () => {
  setStatus('Loading data..')

  const data = ungzip(await (await window.fetch('data/processed_data.csv.gz')).arrayBuffer(), { to: 'string' })
  // console.log('data', data)
  // DATA.sets = data.substring(2).split(/[\ns,]+/).map(s => {

  const counts = { sets: 0, mocs: 0 }
  DATA.sets = data.substring(2).split(/(?:\ns,|\nm,)+/).map(s => {
    const parts = s.split('\n')
    const setDetails = parts.shift().split(',')
    const partsObj = parts.map(p => {
      const partDetails = p.split(',')
      return { partId: partDetails[0], quantity: parseInt(partDetails[1]), color: partDetails[2], isSpare: partDetails[3] === 't', imgUrl: partDetails[4] }
    })
    const partsMap = new Map(partsObj.filter(p => !p.isSpare).map(p => [p.partId, p.quantity]))
    let type = 'set'
    if (setDetails[0].startsWith('MOC')) {
      type = 'moc'
      counts.mocs++
    } else {
      counts.sets++
    }

    let instructionCount = 0
    if (setDetails.length > 5) instructionCount = parseInt(setDetails[5])
    return {
      id: setDetails[0],
      name: setDetails[1],
      partsUsed: parseInt(setDetails[2]),
      partsTotal: parseInt(setDetails[3]),
      parts: partsObj,
      partsMap,
      theme: setDetails[4],
      instructionCount,
      type
    }
  })
  // console.log('rawSetData', DATA.sets)

  setStatus('Data loaded')
  document.querySelector('.counts').innerHTML = ` <span class="badge text-bg-secondary">Sets: ${counts.sets}</span> <span class="badge text-bg-secondary">MOCs: ${counts.mocs}</span>`
  // console.log('Data processed', DATA)
}
const setUserParts = () => {
  const userSets = DATA.userSets.map(i => {
    const set = DATA.sets.find(s => s.id === i)
    return set
  })
  // console.log('userSets', userSets)

  // TODO - Synonym parts, eg parts that can be swapped
  DATA.userParts = new Map()
  for (const set of userSets) {
    for (const part of set.parts) {
      const existingPart = DATA.userParts.get(part.partId)
      if (existingPart) {
        DATA.userParts.set(part.partId, existingPart + part.quantity)
      } else {
        DATA.userParts.set(part.partId, part.quantity)
      }
    }
  }
}
const clearResultsList = () => {
  document.querySelector('.results-list').innerHTML = ''
}
const createPartHtml = (p) => {
  // console.log('createPartHtml', p)
  return `
  <div class="col-md-1 col-4 item" data-set-id="${p.partId}">
    <img class="img-fluid" src="https://cdn.rebrickable.com/media/parts/${p.imgUrl}"> 
    <p>${p.partId}</br> Need x${p.quantity}${p.have ? `<br/>Have x${p.have}` : ''}</p>
  </div>
  `
}

const listResultClickHandler = (e) => {
  const r = DATA.results[parseInt(e.target.closest('tr').getAttribute('data-result'))]
  // console.log('result', r)
  const modalEle = document.querySelector('.modal')
  modalEle.querySelector('.modal-title').innerHTML = `${r.name} (${r.id})`

  let img = `https://cdn.rebrickable.com/media/sets/${r.id.toLowerCase()}.jpg`
  let url = `https://rebrickable.com/sets/${r.id.toLowerCase()}/`
  if (r.type === 'moc') {
    img = `https://cdn.rebrickable.com/media/thumbs/mocs/${r.id.toLowerCase()}.jpg/1000x800.jpg`
    url = `https://rebrickable.com/mocs/${r.id.toLowerCase()}/`
  }

  const modalBodyHtml = `
  <div class="row">
    <div class="col-md-6">
      <h2>${r.name} (${r.id})</h2>
      ${r.type === 'moc'
? `<p>Instructions:
      ${r.instructionCount === 0
        ? 'Premium <span class="badge text-bg-secondary"><i class="bi bi-currency-dollar"></i></span>'
: r.instructionCount}</p>`
: ''}
      <p><a href="${url}" target="_blank">Visit rebrickable</a></p>
    </div>
    <div class="col-md-6">
      <img class="img-fluid" src="${img}" />
    </div>
  </div>
  <h4>Got ${r.got} parts</h4>
  <div class="row">
    ${r.gotParts.map(p => createPartHtml(p)).join('')}
  </div>
  <h4>Not got ${r.not} parts</h4>
  <div class="row">
    ${r.notParts.map(p => createPartHtml(p)).join('')}
  </div>
  <h4>Not enough of ${r.notEnough} parts</h4>
  <div class="row">
    ${r.notEnoughParts.map(p => createPartHtml(p)).join('')}
  </div>
  `
  modalEle.querySelector('.modal-body').innerHTML = modalBodyHtml
  modal.show()
}
const createList = () => {
  // console.log('createList', DATA.userSets)
  setStatus('Preparing user parts')

  disableCreateListButton()
  clearResultsList()
  setUserParts()

  // console.log('userParts', DATA.userParts)

  setStatus('Creating list')
  let results = []
  for (let i = 0; i < DATA.sets.length; i++) {
    const set = DATA.sets[i]
    if (['Service', 'Bulk', 'Set', 'Mindstorms', 'Supplemental'].some(s => set.theme.includes(s))) {
      continue
    }

    let got = 0
    const gotParts = []
    let notEnough = 0
    const notEnoughParts = []
    let not = 0
    const notParts = []

    for (const [partId, quantity] of set.partsMap) {
      const userPart = DATA.userParts.get(partId)
      if (userPart === undefined) {
        not += quantity
        notParts.push({ partId, quantity, imgUrl: set.parts.find(p => p.partId === partId).imgUrl })
      } else if (userPart < quantity) {
        notEnough += quantity
        notEnoughParts.push({ partId, quantity, have: userPart, imgUrl: set.parts.find(p => p.partId === partId).imgUrl })
      } else {
        got += quantity
        gotParts.push({ partId, quantity, imgUrl: set.parts.find(p => p.partId === partId).imgUrl })
      }
    }
    // console.log('createList', i + 1, 'of', DATA.sets.length, 'got:', got, gotParts, 'notEnough:', notEnough, notEnoughParts, 'not:', not, notParts, set)

    if (set.type === 'mocx' || (not <= 20 && set.partsUsed >= 30 && got > 50)) {
      let resultClass = ''
      if (DATA.userSets.includes(set.id)) {
        resultClass = 'table-warning'
      } else if (notEnough === 0 && not === 0) {
        resultClass = 'table-success'
      } else if (notEnough <= 10 && not <= 10) {
        resultClass = 'table-info'
      }
      results.push({
        id: set.id,
        name: set.name,
        theme: set.theme,
        partsUsed: set.partsUsed,
        type: set.type,
        instructionCount: set.instructionCount,
        got,
        gotParts,
        notEnough,
        notEnoughParts,
        not,
        notParts,
        resultClass
      })
    }
  }
  results = results.sort((a, b) => a.not - b.not || a.notEnough - b.notEnough || b.got - a.got)
  DATA.results = results
  // console.log('results', results)

  const tableRowsHtml = results.map((r, i) => {
    let img = `https://cdn.rebrickable.com/media/sets/${r.id.toLowerCase()}.jpg`
    let isPremium = false
    if (r.type === 'moc') {
      img = `https://cdn.rebrickable.com/media/thumbs/mocs/${r.id.toLowerCase()}.jpg/1000x800.jpg`
      isPremium = r.instructionCount === 0
    }

    return `
    <tr class="${r.resultClass}" data-result="${i}">
      <th scope="row"><p>${r.id}${isPremium ? ' <span class="badge text-bg-secondary"><i class="bi bi-currency-dollar"></i></span>' : ''}</p></th>
      <td><p>${r.name}<br/>${r.theme}</p></td>
      <td><img class="img-fluid" src="${img}" /></td>
      <td><p>${r.got}</p></td>
      <td><p>${r.notEnough}</p></td>
      <td><p>${r.not}</p></td>
    </tr>
  `
  }).join('')
  const tableHtml = `<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Got</th>
      <th scope="col">Not enough</th>
      <th scope="col">Not</th>
    </tr>
  </thead>
  <tbody>
    ${tableRowsHtml}
  </tbody>`

  document.querySelectorAll('.results-list tr').forEach((result) => {
    result.removeEventListener('click', listResultClickHandler)
  })

  document.querySelector('.results-list').innerHTML = tableHtml

  document.querySelectorAll('.results-list tr').forEach((result) => {
    result.addEventListener('click', listResultClickHandler)
  })
  setStatus('List created')
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
  // console.log('removeSet', id)
  DATA.userSets = DATA.userSets.filter(s => s !== id)
  refreshUserSets()
  saveUserSets()
  clearResultsList()
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
  // console.log('refreshUserSets', DATA.userSets)

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
  // console.log('addSet', id)
  if (!DATA.userSets.includes(id)) {
    DATA.userSets.push(id)
    refreshUserSets()
    saveUserSets()
    clearResultsList()
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
  setSearch.addAll(DATA.sets.filter(s => s.type === 'set'))
  // console.log('results', setSearch.search('tractor'), setSearch.search('2621-2'))
  const resultArea = document.querySelector('.user-inventory-select-results')
  document.querySelector('.user-inventory-select').addEventListener('keyup', function (e) {
    const searchTerm = encodeURIComponent(this.value)
    const results = setSearch.search(searchTerm).slice(0, 18)

    const resultHtml = results.map(r => createItemHtml(r, 'Add')).join('')
    // console.log('results', searchTerm, results)

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
  // console.log('init')
  await fetchData()
  loadUserSets()
  await bindAddSetOptions()
  bindCreateListButton()
  enableCreateListButton()
  setStatus('Ready')
}

init()
