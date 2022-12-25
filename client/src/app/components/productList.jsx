import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToCarts } from '../store/cartsSlice'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
const ProductList = ({ userCrop, currentSort, onSort }) => {
  const dispatch = useDispatch()
  const handleSort = () => {
    onSort({ ...currentSort, order: currentSort.order==='asc'?'desc':'asc' })
  }
  const renderArrow = () => {
    if (currentSort.order==='asc') {
      return 'bi bi-caret-up-fill'
    } else {
      return 'bi bi-caret-down-fill'
    }
  }

  return (
    <div>
      <i className = {renderArrow()} onClick={() => handleSort()} role='button'>Sort by price</i>
      <ul className='d-flex flex-column p-1'>{
        userCrop.map(p =>
          <li className='list-group-item p-2' key={p._id}>
            <div className="card mb-3 rounded-3" style={{ maxWidth: '850px' }}>
              <div className="row g-0 ">
                <div className="col-md-4">
                  <Swiper navigation={true}
                    modules={[Navigation]}
                    className="mySwipre">
                    {p.images.map(i => (
                      <SwiperSlide key={Math.random()}>
                        <img src={i}
                          className="img-fluid rounded-start"
                          style={{ maxHeight: '250px' }}
                          alt="imageProduct"/>
                      </SwiperSlide>))}
                  </Swiper>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className='card-title'>
                      <Link to={`/${p._id}`}> {p.title} </Link>
                      <i className="bi bi-cart"
                        role='button'
                        onClick={() => dispatch(addToCarts(p))}></i>
                    </h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">{p.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      }</ul>
    </div>
  )
}

ProductList.propTypes = {
  onSort: PropTypes.func,
  userCrop: PropTypes.array.isRequired,
  currentSort: PropTypes.object.isRequired
}
export default ProductList
