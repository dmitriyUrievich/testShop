import React, { useEffect } from 'react'
import Paginaton from './pagination'
import { paginate } from '../utils/paginate'
import GroupList from './common/groupList'
import ProductList from './productList'
import SearchStatus from './searchStatus'
import _ from 'lodash'
import useMainLogic from '../hook/useMainLogic'
import SearchField from './common/serchField'

const MainPage = () => {
  const pageSize = 5
  const {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectCategory,
    setSelectCategory,
    sortBy,
    setSortBy,
    filtredProducts,
    category
  } = useMainLogic()
  useEffect(() => {
    setCurrentPage(1)
  }, [selectCategory, searchQuery])
  const handleSeaerchQuery = ({ target }) => {
    setSelectCategory(undefined)
    setSearchQuery(target.value)
  }
  const handleCategorySelect = (categ) => {
    if (searchQuery!=='') setSearchQuery('')
    setSelectCategory(categ._id)
  }
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleClearFilter = () => {
    setSelectCategory()
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  const count = filtredProducts.length
  const sortedProd = _.orderBy(filtredProducts, [sortBy.iter], [sortBy.order])

  const userCrop = paginate(sortedProd, currentPage, pageSize)
  return <>
    <div className="d-flex p-5">
      {category &&(
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList items={category} selectedCateg={selectCategory} onItemSelect={handleCategorySelect}/>
          <button className='btn btn-secondary mt-2' onClick={handleClearFilter}>Clear filter</button>
        </div>
      )}
      <div className='container mx-auto'>
        <div className='mx-3'>
          <div className='row' >
            <div className='col' >
              <SearchStatus length={count} />
            </div>
            <div className='col' >
              <SearchField name='selectedQuery' value={searchQuery} onChange={handleSeaerchQuery}/>
            </div>
          </div>
        </div>
        <ProductList userCrop={userCrop} onSort={handleSort} currentSort={sortBy}/>
      </div>
    </div>
    <div className="d-flex justify-content-center">
      <Paginaton itemCount={count} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  </>
}

export default MainPage
