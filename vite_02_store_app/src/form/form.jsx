import React, {useState} from 'react'
import {TextField, InputLabel, Select, Button} from '@mui/material'
import {saveProduct} from '../services/productServices'

function Form() {
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({name: '', size: '', type: ''})

  const validateField = ({name, value}) => {
    console.log({name, value})
    setFormErrors(p => ({
      ...p,
      [name]: value.length > 0 ? '' : `The ${name} is required`,
    }))
  }

  const validateForm = ({name, size, type}) => {
    validateField({name: 'name', value: name})
    validateField({name: 'type', value: type})
    validateField({name: 'size', value: size})
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSaving(true)
    const {name, size, type} = event.target.elements
    validateForm({
      name: name.value.trim(),
      size: size.value.trim(),
      type: type.value.trim(),
    })
    await saveProduct()
    setIsSaving(false)
  }
  const handleBlur = event => {
    const {name, value} = event.target
    console.log({name, value, event})
    validateField({name, value: value.trim()})
    console.log({formErrors})
  }
  return (
    <>
      <h1>Create product</h1>
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
