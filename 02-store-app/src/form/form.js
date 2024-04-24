import React from 'react'
import {TextField, InputLabel, Select} from '@mui/material'

function Form() {
  //   console.log('hola')
  return (
    <>
      <h1>Create product</h1>
      <form>
        <TextField label="name" id="name" />
        <TextField label="size" id="size" />
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
      </form>
    </>
  )
}

export default Form
