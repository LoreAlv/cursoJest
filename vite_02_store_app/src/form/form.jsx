import React, {useState} from 'react'
import {
  TextField,
  InputLabel,
  Select,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material'
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
      <Container maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" align="center">
          Create product
        </Typography>
        {isSuccess && <p>Product Stored</p>}
        {errorMessage && <p>${errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="name"
                id="name"
                name="name"
                helperText={formErrors.name}
                error={formErrors.name.length > 0}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="size"
                id="size"
                name="size"
                helperText={formErrors.size}
                error={formErrors.size.length > 0}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                fullWidth
                native
                labelId="type"
                id="type"
                // value=""
                label="type"
                inputProps={{name: 'type', id: 'type'}}
                //   onChange={handleChange}
                onBlur={handleBlur}
                error={formErrors.type.length > 0}
              >
                <option value="" aria-label="none" />
                <option value="electronic">Electronic</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
              </Select>
              {formErrors.type.length !== 0 && <p>{formErrors.type}</p>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" disabled={isSaving} fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}

export default Form
