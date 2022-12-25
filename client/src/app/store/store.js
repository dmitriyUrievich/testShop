import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from './productSlice'
import categorysReducer from './categirysSlice'
import cartsReducer from './cartsSlice'
import commentsReducer from './commentsSlice'
import usersReducer from './userSlice'
const rootReducer = combineReducers({
  carts: cartsReducer,
  products: productsReducer,
  categorys: categorysReducer,
  comments: commentsReducer,
  users: usersReducer
})
export const store = configureStore({
  reducer: rootReducer
})
