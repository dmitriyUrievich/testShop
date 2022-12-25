import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
const Paginaton = ({ itemCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemCount/pageSize)
  if (pageCount===1) return null
  const pages = _.range(1, pageCount+1)
  return <nav >
    <ul className="pagination">
      {pages.map(p => <li
        className={'page-item'+(p===currentPage?' active':'')}
        key={'page'+p}>
        <button className="page-link" onClick={() => onPageChange(p)}>{p}</button>
      </li>)}

    </ul>
  </nav>
}
Paginaton.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}
export default Paginaton
