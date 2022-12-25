import React from 'react'
import PropTypes from 'prop-types'
const GroupList = ({ items, onItemSelect, valueProperty, selectedCateg, contentProperty }) => {
  return (
    <>
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item._id}
            className={
              'list-group-item ' +
              (item === selectedCateg ? ' active' : '')
            }
            onClick={() => onItemSelect(item)}
            role="button"
          >
            {item[contentProperty]}
          </li>
        ))}
      </ul>
    </>)
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  items: PropTypes.array.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedCateg: PropTypes.string
}
export default GroupList
