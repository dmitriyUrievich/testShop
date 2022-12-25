import { createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    carts: []
  },
  reducers: {
    addToCarts: (state, action) => {
      const itemInCart = state.carts.find((item) => item._id === action.payload._id)
      if (itemInCart) {
        localStorageService.setCart(itemInCart._id, JSON.stringify(itemInCart))
        itemInCart.quantity++
      } else {
        localStorageService.setCart(action.payload._id, JSON.stringify({ ...action.payload, quantity: 1 }))
        state.carts.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload)
      item.quantity++
    },
    decrementQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload)
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.carts.filter(
        (item) => item._id !== action.payload
      )
      state.carts = removeItem
    }
  }
})
const { reducer: cartsReducer, actions } = cartsSlice

export const getCartsList = () => (state) => state.carts.carts
export const getCartsLocalStorage = () => (state) => {
  // const mas = []
  const keys = Object.keys(localStorage)
  for (const key of keys) {
  // console.log('Object.keys(state.carts)', state.carts)
  // console.log('state.carts._id', JSON.stringify(key))
    console.log(`${key}: ${localStorage.getItem(key)}`)
  }
  // console.log('array,+++', mas)
  // Object.keys(state.carts).map(cart => mas.push(localStorageService.getUserId(cart._id)))
  // return mas
}

export const { addToCarts, incrementQuantity, decrementQuantity, removeItem } =
  actions
export default cartsReducer
