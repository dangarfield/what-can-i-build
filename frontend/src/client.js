const DATA = {}

const setStatus = (status) => {
  document.querySelector('.status').textContent = status
}
const fetchData = async () => {
  setStatus('Loading data..')
  const files = [
    'themes.json',
    'colors.json',
    'part_categories.json',
    'parts.json',
    'part_relationships.json',
    'elements.json',
    'sets.json',
    'minifigs.json',
    'inventories.json',
    'inventory_parts.json',
    'inventory_sets.json',
    'inventory_minifigs.json'
  ]
  console.log('files', files)
}
const init = async () => {
  console.log('init')

  await fetchData()
}

init()