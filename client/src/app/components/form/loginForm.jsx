import React, { useCallback, useEffect, useState } from 'react'
import TextField from '../common/textField'
import { validator } from '../../utils/validator'
import { Link, useNavigate } from 'react-router-dom'
import { navigateForm } from '../../utils/NavigateToForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthError, login } from '../../store/userSlice'
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const location = useLocation()
  const [data, setData] = useState({ email: '', password: '' })
  const loginError = useSelector(getAuthError())
  const [errors, setErrors] = useState({})
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
    password: {
      isRequired: {
        message: 'Password is required'
      }
      // isCapitalSymbol: {
      //   message: 'The password must contain at least one capital letter'
      // },
      // isContainDigit: {
      //   message: 'The password must contain at least one number'
      // },
      // min: {
      //   message: 'The password must consist of at least 8 characters',
      //   value: 8
      // }
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
  const handleKeyDown = useCallback((e) => {
    navigateForm(e)
  }, [])
  const handleSubmit = (e) => {
    // const redirect = location.state
    //   ?location.state.referer.pathname
    //   :'product'
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
    dispatch(login(data))
    navigate('/')
    // .then(() => ).catch((e) => console.log(e))
  }
  return (
    <>
      <h3 className='mb-4'>Sign In</h3>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
          autoFocus
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        {loginError && <p className="text-danger">{loginError}</p>}
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
      <p>Dont have account ? <Link to='/auth/signup' >Sing Un</Link></p>
    </>
  )
}

export default LoginForm
