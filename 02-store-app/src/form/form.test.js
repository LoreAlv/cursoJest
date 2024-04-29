import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Form from './form'

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  rest.post('/login', ({req, res, ctx}) =>
    res(ctx.json({token: 'mocked_user_token'})),
  ),
)

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
    render(<Form />)
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(getSubmitButton())
    // screen.debug()

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
})

describe('when the user blurs a field that is empty', () => {
  test('should display the required message for name field', () => {
    render(<Form />)
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()

    fireEvent.blur(getNameField(), {target: {name: 'name', value: ''}})
    // screen.debug()
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
  })

  test('should display the required message for size field', () => {
    render(<Form />)
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()

    fireEvent.blur(getSizeField(), {target: {name: 'size', value: ''}})
    // screen.debug()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
  })

  test('should display the required message for type field', () => {
    render(<Form />)
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.blur(getTypeField(), {target: {name: 'type', value: ''}})
    // screen.debug()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
})

describe('when the user submits the form', () => {
  // Enable request interception.
  beforeAll(() => server.listen())

  // Reset handlers so that each test could alter them
  // without affecting other, unrelated tests.
  afterEach(() => server.resetHandlers())

  // Don't forget to clean up afterwards.
  afterAll(() => server.close())

  test('should disable the submit button until request is done', () => {
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    expect(getSubmitButton()).toBeDisabled()
  })
})
