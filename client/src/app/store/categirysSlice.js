import { createSlice } from '@reduxjs/toolkit'
import categoryService from '../services/category.service'

const categorysSlice = createSlice({
  name: 'categorys',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    categorysRequested: (state) => {
      state.isLoading = true
    },
    categorysReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    categorysRequestFailed: (state, action) => {
      state.error = action.payload
    },
    // addToCart: (state, action) => {
    //   console.log(state, action)
    //   const itemInCart = state.cart.find(
    //     (item) => item.id === action.payload.id
    //   )
    //   if (itemInCart) {
    //     itemInCart.quantity++
    //   } else {
    //     state.cart.push({ ...action.payload, quantity: 1 })
    //   }
    // },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      )
      state.cart = removeItem
    }
  }
})
export const loadCategorysList = () => async(dispatch, getState) => {
  dispatch(categorysRequested())
  try {
    const content = await categoryService.get()
    dispatch(categorysReceived(content))
  } catch (error) {
    dispatch(categorysRequestFailed(error.message))
  }
}
const { reducer: categorysReducer, actions } = categorysSlice
const { categorysRequested, categorysReceived, categorysRequestFailed } = actions
export const getCategoryById = (categoryId) => (state) => {
  if (state.categorys.entities) return state.categorys.entities.find((p) => String(p._id) === categoryId)
}
export const getCategorysList = () => (state) => state.categorys.entities

export default categorysReducer
