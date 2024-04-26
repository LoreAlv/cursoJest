import React, {useState} from 'react'
import {TextField, InputLabel, Select, Button} from '@mui/material'

function Form() {
  const [formErrors, setFormErrors] = useState({name: '', size: '', type: ''})

  const handleSubmit = event => {
    event.preventDefault()
    const {name, size, type} = event.target.elements
    const formAux = {...formErrors}
    if (!name.value || name.value.trim().length === 0)
      formAux.name = 'The name is required'
    if (!size.value || size.value.trim().length === 0)
      formAux.size = 'The size is required'
    if (!type.value) formAux.type = 'The type is required'
    setFormErrors(formAux)
  }
  return (
    <>
      <h1>Create product</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="name" id="name" helperText={formErrors.name} />
        <TextField label="size" id="size" helperText={formErrors.size} />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          labelId="type"
          id="type"
          value=""
          label="type"
          inputProps={{name: 'type', id: 'type'}}
          //   onChange={handleChange}
        >
          <option value="" aria-label="none" />
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </Select>
        {formErrors.type.length && <p>{formErrors.type}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}

export default Form
