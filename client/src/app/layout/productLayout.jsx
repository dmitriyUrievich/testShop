import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getProductById } from '../store/productSlice'
import Product from '../components/product'
import EditForm from '../components/form/editForm'
import MainPage from '../components/MainPage'
const ProductLayout = () => {
  const params = useParams()
  const { productId, edit } = params
  const currentPageId = useSelector(getProductById(productId))

  return (
    <>
      {
        productId
          ? (
            edit
              ? (
                productId === currentPageId
                  ? (
                    <EditForm/>
                  )
                  : (
                    <Navigate to={`/${currentPageId}/edit`} />
                  )
              )
              : (
                <Product/>
              )
          )
          :<MainPage/>
      }
    </>
  )
}
export default ProductLayout
