import React, {useState} from 'react'
import {TextField, InputLabel, Select, Button} from '@mui/material'
import {saveProduct} from '../services/productServices'
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../consts/httpStatus'

function Form() {
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({name: '', size: '', type: ''})
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateField = ({name, value}) => {
    // console.log({name, value})
    setFormErrors(p => ({
      ...p,
      [name]: value.length > 0 ? '' : `The ${name} is required`,
    }))
  }

  const getFormValues = ({name, size, type}) => ({
    name: name.value.trim(),
    size: size.value.trim(),
    type: type.value.trim(),
  })

  const validateForm = ({name, size, type}) => {
    validateField({name: 'name', value: name})
    validateField({name: 'type', value: type})
    validateField({name: 'size', value: size})
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSaving(true)
    const {name, size, type} = event.target.elements
    validateForm(getFormValues({name, size, type}))
    try {
      const response = await saveProduct(getFormValues({name, size, type}))
        .then(r => r)
        .catch(e => {
          // console.log(e)
          let res
          if (e?.response?.status) {
            res = e.response
          } else res = {status: e}
          // console.log(res)
          throw res
        })
      console.log(response)
      if (response.status === CREATED_STATUS) {
        event.target.reset()
        setIsSuccess(true)
        setErrorMessage('')
      }
    } catch (e) {
      handleFetchError(e)
    }
    setIsSaving(false)
  }
  const handleFetchError = e => {
    let error = ''
    switch (e.status) {
      case ERROR_SERVER_STATUS:
        error = 'Unexpected error, please try again'
        break
      case INVALID_REQUEST_STATUS:
        error = e.statusText
        break
      default:
        error = 'Connection error, please try later'
        break
    }
    setErrorMessage(error)
  }

  const handleBlur = event => {
    const {name, value} = event.target
    // console.log({name, value, event})
    validateField({name, value: value.trim()})
    // console.log({formErrors})
  }
  return (
    <>
      <h1>Create product</h1>
      {isSuccess && <p>Product Stored</p>}
      {errorMessage && <p>${errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="name"
          id="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />
        <TextField
          label="size"
          id="size"
          name="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          labelId="type"
          id="type"
          // value=""
          label="type"
          inputProps={{name: 'type', id: 'type'}}
          //   onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" aria-label="none" />
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </Select>
        {formErrors.type.length !== 0 && <p>{formErrors.type}</p>}
        <Button type="submit" disabled={isSaving}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default Form
