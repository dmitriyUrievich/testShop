import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incrementQuantity, removeItem } from '../store/cartsSlice'

const CartItem = ({ _id, title, price, img, quantity= 0 }) => {
  const dispatch = useDispatch()
  return (
    <>
      <li className='list-group-item p-2'>
        <div className="card mb-3 rounded-3" style={{ maxWidth: '450px' }}>
          <div className="row g-0 ">
            <div className="col-md-4">
              <img src={img[0]} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className='card-title'>
                  {title}
                  <i className="bi bi-x" role='button' onClick={() => dispatch(removeItem(_id))}></i></h5>
                <small>$</small><strong>{price}</strong>
                <div>
                  <i className="bi bi-dash" role='button'
                    onClick={() => dispatch(decrementQuantity(_id))}>
                  </i>
                  <span className="my-3 mx-2">{quantity}</span>
                  <i className="bi bi-plus" role='button'
                    onClick={() => dispatch(incrementQuantity(_id))}>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
export default CartItem
