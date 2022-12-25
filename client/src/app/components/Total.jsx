import React from 'react'
import { useSelector } from 'react-redux'
import { getCartsList } from '../store/cartsSlice'

function Total() {
  const carts = useSelector(getCartsList())
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    carts.forEach((item) => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }
  return (
    <>
      {carts.length>0
        ?<div>
          <h2>ORDER SUMMARY</h2>
          <div>
            <p className="total__p">
            Total ({getTotal().totalQuantity} items) :{' '}
              <strong>${getTotal().totalPrice}</strong>
            </p>
          </div>
        </div>
        :<div className='shop-card'>Cart is empty</div> }
    </>
  )
}

export default Total
