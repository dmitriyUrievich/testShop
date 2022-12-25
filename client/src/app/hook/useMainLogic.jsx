import { useSelector } from 'react-redux'
import { getProductsList } from '../store/productSlice'
import { getCategorysList } from '../store/categirysSlice'
import { useState } from 'react'

const useMainLogic = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectCategory, setSelectCategory] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'price', order: 'asc' })
  const products = useSelector(getProductsList())
  const category = useSelector(getCategorysList())

  const filtredProducts = searchQuery
    ? products.filter(
      (prod) =>
        prod.title
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) !== -1
    )
    : selectCategory
      ? products.filter(
        (prod) =>
          JSON.stringify(prod.category) ===
          JSON.stringify(selectCategory)
      )
      : products

  return {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectCategory,
    setSelectCategory,
    sortBy,
    setSortBy,
    products,
    category,
    filtredProducts
  }
}

export default useMainLogic
