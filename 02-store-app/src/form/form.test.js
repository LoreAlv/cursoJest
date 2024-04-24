import React from 'react'
import {render, screen} from '@testing-library/react'
import Form from './form'

describe('pruebas de form.js', () => {
  test('should render la pagina', () => {
    render(<Form />)
    // expect(screen.queryByText(/create product/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /create product/i}),
    ).toBeInTheDocument()
  })

  test('should esist fields: name, size, type(electronic, furniture, clothing)', () => {
    render(<Form />)

    screen.debug()
    // existen los campos

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    // existen las opciones

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  })
})
