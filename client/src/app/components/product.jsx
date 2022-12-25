import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getProductById } from '../store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCarts } from '../store/cartsSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const Product = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(getProductById(productId))
  return (
    <>
      <Outlet/>
      <div className="card mb-3 rounded-3" style={{ maxWidth: '850px' }}>
        <div className="row g-0 ">
          <div className="col-md-4">
            <Swiper navigation={true}
              modules={[Navigation]}
              className="mySwiper">
              {product.images.map(i => <SwiperSlide key={Math.random()}>
                <img src={i} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
              </SwiperSlide>)}
            </Swiper>
          </div>
          <div className ="col-md-8">
            <div className="card-body">
              <h5 className='card-title'>
                <p> {product.title} </p>
                <i className="bi bi-cart"
                  role='button'
                  onClick={() => dispatch(addToCarts(product))}></i>
              </h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Product
