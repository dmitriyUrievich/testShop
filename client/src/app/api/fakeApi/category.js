export const categorys = {
  smartphones: { id: '157216bc-19be-4a36-b6b6-4f574eadfa06', name: 'Smartphones' },
  laptops: { id: '1a92700e-870f-44cc-8649-863af5f72cff', name: 'Laptops' },
  fragrances: { id: '4f8f089e-6230-4494-bcf0-3d261e7d3f57', name: 'Fragrances' },
  skincare: { id: 'f06af2ba-d637-4d72-9a70-f72d0255744f', name: 'Skincare' },
  homeDecoration: { id: '96e01efa-f428-4930-bab0-925ad6a6c8f7', name: 'HomeDecoration' },
  furniture: { id: '3f5c2314-9e56-42d5-bccb-f81f553a60d4', name: 'Furniture' },
  tops: { id: '53dd5d72-2e13-4797-8dc5-b6888ed34eb0', name: 'Tops' },
  womensDress: { id: 'fb39751b-63f2-4330-8443-09ad586e7c45', name: 'WomensDress' },
  womensShoes: { id: '63fa3a84-7d49-45a0-a292-4084c2c0e6b0', name: 'WomensShoes' },
  mensShirts: { id: '57ec78ec-e3c2-432a-a4b6-f5f69d539e41', name: 'MensShirts' },
  mensShoes: { id: 'aedaa6f2-6910-4a77-bde8-7769f54d98db', name: 'MensShoes' },
  mensWatches: { id: '9ccbd447-ef90-4a02-b1dd-907e7a4084ac', name: 'MensWatches' },
  womensWatches: { id: '89874790-42db-4e3e-bdcb-46c3e393e68b', name: 'WomensWatches' },
  womensBags: { id: '52cf68e0-c719-42f9-a10f-f80b108a3816', name: 'WomensBags' },
  womensJewellery: { id: '64b7fa9d-23c9-4d76-adae-5064766a0e26', name: 'WomensJewellery' },
  sunglasses: { id: 'c44eda5e-5e9d-4554-b9ed-7394bd7cbc64', name: 'Sunglasses' },
  automotive: { id: '2c098b45-e536-4edd-97d8-11cab4a80683', name: 'Automotive' },
  motorcycle: { id: '5001dc5f-6334-4b10-8de9-06d45c6596c7', name: 'Motorcycle' },
  lighting: { id: '1cf892d1-dc0c-4f00-ae78-74f7106f6cc2', name: 'Lighting' }
}
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function() {
      resolve(categorys)
    }, 1000)
  })
const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function() {
      resolve(Object.keys(categorys).find((p) => p.id === id))
    }, 1000)
  })
export default {
  fetchAll,
  getById
}
