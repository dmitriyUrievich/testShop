import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './cartItem'
import Total from './Total'
import { getCartsList, getCartsLocalStorage } from '../store/cartsSlice'

const Cart = () => {
  const cart = useSelector(getCartsList())
  const cartList = useSelector(getCartsLocalStorage())
  console.log(cartList, 'getcart')
  return (
    <div className='shop-card'>
      {cart.map((item) => <CartItem key={item._id} _id={item._id} title={item.title} img={item.images} price={item.price} quantity={item.quantity}/>)}
      <Total/>
    </div>
  )
}
export default Cart
