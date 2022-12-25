import React from 'react'
import PropTypes from 'prop-types'
const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1))
    if (number > 4 && number < 15) {
      return 'product found'
    }
    if (lastOne === 1) return 'product found'
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'products found'
    return 'product found'
  }
  return (
    <h2>
      <span
        className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}
      >
        {length > 0
          ? `${length + ' ' + renderPhrase(length)} `
          : 'No product'}
      </span>
    </h2>
  )
}
SearchStatus.propTypes = {
  length: PropTypes.number
}

export default SearchStatus
