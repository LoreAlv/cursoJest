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
})
