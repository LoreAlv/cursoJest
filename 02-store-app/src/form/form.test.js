import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Form from './form'

const getSubmitButton = () => screen.getByRole('button', {name: /submit/i})
const getNameField = () => screen.getByLabelText(/name/i)
const getSizeField = () => screen.getByLabelText(/size/i)
const getTypeField = () => screen.getByLabelText(/type/i)

describe('pruebas de  carga de form.js', () => {
  test('should render la pagina', () => {
    render(<Form />)
    // expect(screen.queryByText(/create product/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /create product/i}),
    ).toBeInTheDocument()
  })

  test('should exist fields: name, size, type(electronic, furniture, clothing)', () => {
    render(<Form />)

    // screen.debug()
    // existen los campos

    expect(getNameField()).toBeInTheDocument()
    expect(getSizeField()).toBeInTheDocument()
    expect(getTypeField()).toBeInTheDocument()

    // existen las opciones

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  })

  test('should exist submit button', () => {
    render(<Form />)

    // screen.debug()
    // existen el botón

    expect(getSubmitButton()).toBeInTheDocument()
  })
})

describe('when the form is submited', () => {
  test('should show "The [field name] is required" if the field is empty', () => {
    // The [field name] is required
    render(<Form />)
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(getSubmitButton())
    screen.debug()

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
})
