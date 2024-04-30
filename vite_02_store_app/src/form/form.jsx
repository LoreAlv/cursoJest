import React, {useState} from 'react'
import {TextField, InputLabel, Select, Button} from '@mui/material'
import axios from 'axios'
function Form() {
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({name: '', size: '', type: ''})

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSaving(true)
    const {name, size, type} = event.target.elements
    const formAux = {...formErrors}
    if (!name.value || name.value.trim().length === 0)
      formAux.name = 'The name is required'
    if (!size.value || size.value.trim().length === 0)
      formAux.size = 'The size is required'
    if (!type.value) formAux.type = 'The type is required'
    setFormErrors(formAux)

    await axios.post('http://localhost/products', {
      params: JSON.stringify({}),
    })
    // .then(response => {
    //   console.log(response.data)
    // })
    // .catch(error => {
    //   console.log(error)
    // })

    // await fetch('http://localhost:5173/products', {
    //   method: 'POST',
    //   body: JSON.stringify({}),
    // })
    setIsSaving(false)
  }

  const handleBlur = event => {
    const {name, value} = event.target
    // console.log({name, value, event})
    setFormErrors({
      ...formErrors,
      [name]: value?.length ? '' : `The ${name} is required`,
    })
  }
  return (
    <>
      <h1>Create product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="name"
          id="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />
        <TextField
          label="size"
          id="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          labelId="type"
          id="type"
          value=""
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