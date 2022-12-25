import React from 'react'
import PropTypes from 'prop-types'

function NumberField({ label, name, value, onChange, error }) {
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          min="1"
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}
NumberField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default NumberField
