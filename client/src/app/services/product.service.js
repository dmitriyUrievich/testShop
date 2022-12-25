import httpService from './http.service'
// import localStorageService from './localStorage.service'
const productEndpoint = '/product/'

const productService = {
  get: async() => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  create: async(payload) => {
    const { data } = await httpService.post(
      productEndpoint,
      payload
    )
    return data
  },
  delete: async(id) => {
    const { data } = await httpService.delete(`${productEndpoint}/del/${id}`)
    return data
  },
  update: async(payload) => {
    const { data } = await httpService.patch(
      productEndpoint + payload.productId,
      payload
    )
    return data
  }
}
export default productService
