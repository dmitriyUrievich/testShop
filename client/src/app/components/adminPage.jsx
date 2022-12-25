import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../store/productSlice'
import { useNavigate } from 'react-router-dom'
import SearchField from './common/serchField'
import useMainLogic from '../hook/useMainLogic'
import _ from 'lodash'

const AdminPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    filtredProducts
  } = useMainLogic()

  const sortedProd = _.orderBy(filtredProducts, [sortBy.iter], [sortBy.order])

  // const productsList = useSelector(getProductsList())
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEdit = (productId) => {
    navigate(`/${productId}/edit`)
  }
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }

  const handleCreate = () => {
    navigate(`/addProduct`)
  }

  const handleSeaerchQuery = ({ target }) => {
    setSearchQuery(target.value)
  }

  return <>
    <div className='d-flex'>
      <SearchField value={searchQuery} onChange={handleSeaerchQuery}/>
      <button className='btn btn-success ms-3 mb-3' onClick={handleCreate}>Create product</button>
    </div>
    <ul className='d-flex flex-column p-2'>
      {sortedProd.map(item =>
        <div key={item._id} className="d-flex card mb-3 mx-3 rounded-4">
          <li className='list-group-item p-2'>
            <i className="bi bi-pencil text-primary" role='button' onClick={() => handleEdit(item._id)}> </i>
            <i className="bi bi-trash2 text-danger" role='button' onClick={() => handleDelete(item._id)}></i>
            {item.title}
          </li>
        </div>
      )}
    </ul>
  </>
}

export default AdminPage
