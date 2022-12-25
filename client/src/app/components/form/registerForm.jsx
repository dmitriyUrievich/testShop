import React, { useCallback, useEffect, useState } from 'react'
import TextField from '../common/textField'
import { validator } from '../../utils/validator'
import { Link, useNavigate } from 'react-router-dom'
import { navigateForm } from '../../utils/NavigateToForm'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/userSlice'

const RegisterForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const handleKeyDown = useCallback((e) => {
    navigateForm(e)
  }, [])
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      },
      isEmail: {
        message: 'Email entered incorrectly'
      }
    },
    name: {
      isRequired: {
        message: 'Name is required'
      }
    },
    password: {
      isRequired: {
        message: 'Password is required'
      },
      isCapitalSymbol: {
        message: 'The password must contain at least one capital letter'
      },
      isContainDigit: {
        message: 'The password must contain at least one number'
      },
      min: {
        message: 'The password must consist of at least 8 characters',
        value: 8
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(signUp(data))
    navigate('/')
  }
  return (
    <>
      <h3 className='mb-4'>Sign Up</h3>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
          autoFocus
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
      <p>Already have account ? <Link to='/auth/login' >Sign In</Link></p>
    </>
  )
}

export default RegisterForm
