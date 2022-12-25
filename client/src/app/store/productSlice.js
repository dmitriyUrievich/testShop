import { createSlice } from '@reduxjs/toolkit'
import productService from '../services/product.service'
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true
    },
    productsReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    productsUpdate: (state, action) => {
      state.isLoading = true
    },
    productsUpdateSuccess: (state, action) => {
      state.entities[
        state.entities.findIndex(p => p._id === action.payload._id)
      ] = action.payload
    },
    productCreate: (state, action) => {
      state.isLoading = true
    },
    createProductSuccess: (state, action) => {
      state.entities.push(action.payload)
    },
    productsUpdateFailed: (state) => {
    },
    productsCreateFailed: (state) => {
    },
    removeRequestProduct: (state, action) => {
      state.isLoading = true
    },
    removeReceivedProduct: (state, action) => {
      state.entities = state.entities.filter(e => e._id !== action.payload)
      state.isLoading = false
    },
    removeRequestProductFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})
export const updateProduct = (payload) => async(dispatch) => {
  dispatch(productsUpdate())
  try {
    const content = await productService.update(payload)
    dispatch(productsUpdateSuccess(content))
  } catch (error) {
    dispatch(productsUpdateFailed(error.message))
  }
}

export const deleteProduct = (payload) => async(dispatch) => {
  dispatch(removeRequestProduct())
  try {
    await productService.delete(payload)
    dispatch(removeReceivedProduct(payload))
  } catch (error) {
    dispatch(removeRequestProductFailed(error.message))
  }
}
export const createProduct = (payload) => async(dispatch) => {
  console.log('+++', payload)
  dispatch(productCreate())
  try {
    const content = await productService.create(payload)
    dispatch(createProductSuccess(content))
  } catch (error) {
    dispatch(productsCreateFailed(error.message))
  }
}
export const loadProductsList = () => async(dispatch) => {
  dispatch(productsRequested())
  try {
    const content = await productService.get()
    dispatch(productsReceived(content))
  } catch (error) {
    dispatch(productsRequestFailed(error.message))
  }
}

const { reducer: productsReducer, actions } = productsSlice
const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productsUpdate,
  productsUpdateFailed,
  productsUpdateSuccess,
  productsCreateFailed,
  productCreate,
  createProductSuccess,
  removeRequestProduct,
  removeReceivedProduct,
  removeRequestProductFailed
} = actions
export const getProductById = (productId) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => String(p._id) === productId)
  }
}

// export const getProductByLocal = (productId) => (state) => {
//   if (state.products.entities) {
//     return JSON.parse(localStorage.getItem('products')).find((p) => String(p._id) === productId
//     )
//   }
// }
export const getProductLoadingStatus = () => (state) =>
  state.products.isLoading
export const getProductsList = () => (state) => state.products.entities
export default productsReducer
