import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  onChange,
  options,
  error,
  name,
  defaultOption,
  ...rest
}) => {
  const handleChange = ({ target }) => {
    onChange({ target: { name: target.name, value: target.value } })
  }
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  const optionsArrayy = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName].id }))
    :options
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArrayy.length > 0 &&
          optionsArrayy.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default React.memo(SelectField)
