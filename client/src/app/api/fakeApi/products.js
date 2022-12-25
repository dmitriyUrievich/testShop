
// if (!localStorage.getItem('products')) {
//   localStorage.setItem('products', JSON.stringify(products))
// }

const fetchAll = () => ({
  // new Promise((resolve) => {
  //   window.setTimeout(function() {
  //     resolve(JSON.parse(localStorage.getItem('products')))
  //   }, 1000)
})

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function() {
      resolve(
        JSON.parse(localStorage.getItem('products'))
          .find((p) => p.id === id))
    }, 1000)
  })

const update = ({ productId: id, newData: data }) =>
  new Promise((resolve) => {
    // const products = JSON.parse(localStorage.getItem('products'))
    // const productIdx = products.findIndex((p) => String(p.id) === id)
    // products[productIdx] = { ...products[productIdx], ...data }
    // localStorage.setItem('products', JSON.stringify(products))
    // resolve(products[productIdx])
  })

export default {
  fetchAll,
  getById,
  update
}
