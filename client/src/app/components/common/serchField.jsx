import PropTypes from 'prop-types'
import React from 'react'
const SearchField = ({ searchQuery, onChange }) => {
  return (
    <div>
      <input type="text"
        name='selectedQuery'
        placeholder='Search...'
        value={searchQuery}
        onChange={onChange}/>
    </div>
  )
}
SearchField.defaultProps={
  type: 'text',
  placeholder: 'Search...'
}
SearchField.PropTypes ={
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
export default SearchField
