import React from 'react'
import PropTypes from 'prop-types'

function AreaField({ label, rows, name, value, onChange, error }) {
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  return (<>
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea className={getInputClasses()}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}>
        </textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  </>

  )
}
AreaField.propTypes = {
  rows: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default AreaField
