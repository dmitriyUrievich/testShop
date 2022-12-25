import React, { useCallback, useEffect, useState } from 'react'
import TextField from '../common/textField'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorysList } from '../../store/categirysSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import SelectField from '../common/selectField'
import AreaField from '../common/areaField'
import NumberField from '../common/numberField'
import { validator } from '../../utils/validator'
import { navigateForm } from '../../utils/NavigateToForm'
import { createProduct } from '../../store/productSlice'
import { useNavigate } from 'react-router-dom'

const AddForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const init = {
    category: '',
    title: '',
    price: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: ''
  }
  const [data, setData] = useState(init)
  const [errors, setErrors] = useState({})
  const categorys = useSelector(getCategorysList())

  const handleChange = useCallback(({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  })
  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Title is required'
      }
    },
    price: {
      positive: {
        message: 'Price mast have positive numbers'
      },
      minValue: {
        message: 'No more than 7 numbers',
        value: 7
      }
    },
    description: {
      isRequired: {
        message: 'Description is required'
      }
    },
    image1: {
      isRequired: {
        message: 'Image is required'
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
  const handleKeyDown = useCallback((e) => {
    navigateForm(e)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(validate())
    const isValid = validate()
    if (!isValid) return
    const { category, image1, image2, image3, image4, image5 } = data
    const endImage = []
    endImage.push(image1, image2, image3, image4, image5)
    const newData = {
      price: data.price,
      title: data.title,
      description: data.description,
      category,
      images: endImage
    }
    console.log(newData)
    dispatch(createProduct({ newData })).then(() => navigate(`/`))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  return (
    <>
      <div className="container mt-5 rounded-3">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className='mb-4'>Add Product</h3>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <div className="col-md-4">
                <Swiper navigation={true}
                  modules={[Navigation]}
                  className="mySwiper">
                  <SwiperSlide >
                    <img src={data.image1} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
                  </SwiperSlide>
                  <SwiperSlide >
                    <img src={data.image2} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
                  </SwiperSlide>
                  <SwiperSlide >
                    <img src={data.image3} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
                  </SwiperSlide>
                  <SwiperSlide >
                    <img src={data.image4} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
                  </SwiperSlide>
                  <SwiperSlide >
                    <img src={data.image5} className="img-fluid rounded-start" style={{ maxHeight: '250px' }} alt="imageProduct"/>
                  </SwiperSlide>
                </Swiper>
              </div>
              <TextField
                label="Title"
                name="title"
                value={data.title}
                onChange={handleChange}
                error={errors.title}
                autoFocus
              />
              <SelectField
                label='Your category'
                name='category'
                options={categorys}
                onChange={handleChange}
                defaultOption='Choose...'
                value={data.category}
                error={errors.category}
              />
              <NumberField
                label='Price'
                name='price'
                value={data.price}
                onChange={handleChange}
                error={errors.price}
              />
              <AreaField
                label='Description'
                name='description'
                rows={4}
                value={data.description}
                onChange={handleChange}
                error={errors.description}
              />
              <TextField
                label="Image"
                name='image1'
                value={data.image1}
                onChange={handleChange}
                error={errors.image1}
              />
              <TextField
                label="Image"
                name='image2'
                value={data.image2}
                onChange={handleChange}
              />
              <TextField
                label="Image"
                name='image3'
                value={data.image3}
                onChange={handleChange}
              />
              <TextField
                label="Image"
                name='image4'
                value={data.image4}
                onChange={handleChange}
              />
              <TextField
                label="Image"
                name='image5'
                value={data.image5}
                onChange={handleChange}
              />
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddForm
