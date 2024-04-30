import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './form'
// import httpAdapter from 'axios/lib/adapters/http'
import moxios from 'moxios'
import {CREATED_STATUS, ERROR_SERVER_STATUS} from '../consts/httpStatus'

const getSubmitButton = () => screen.getByRole('button', {name: /submit/i})
const getNameField = () => screen.getByLabelText(/name/i)
const getSizeField = () => screen.getByLabelText(/size/i)
const getTypeField = () => screen.getByLabelText(/type/i)

describe('when the user submits the form', () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    jest.clearAllMocks()
    moxios.install()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      // console.log(request)
      // console.log(request.config.data)
      // console.log(JSON.parse(request.config.data))
      const {name, size, type} = JSON.parse(request.config.data)
      // console.log({name, size, type})
      if (name && size && type) {
        return request.respondWith({
          status: CREATED_STATUS,
        })
      } else {
        return request.respondWith({
          status: ERROR_SERVER_STATUS,
        })
      }
    }, 1000)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })

  test('should disable the submit button until request is done', async () => {
    moxios.stubRequest('http://localhost/products', {
      status: CREATED_STATUS,
      responseText: {token: 'mocked_user_token_disabled'},
    })
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    expect(getSubmitButton()).toBeDisabled()
    //ahora esperamos respuesta y debe activarse de nuevo
    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
  })

  test('malo, no se setean should the form page must display the success message _“Product stored”_ and clean the fields values', async () => {
    moxios.stubRequest('http://localhost/products', {
      status: CREATED_STATUS,
      responseText: {token: 'mocked_user_token_productok'},
    })
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    // screen.debug()
    await waitFor(() =>
      expect(screen.getByText(/product stored/i)).toBeInTheDocument(),
    )
  })

  test('should the form page must display the success message _“Product stored”_ and clean the fields values', async () => {
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    //rellenamos formulario
    fireEvent.change(getNameField(), {target: {value: 'name'}})
    fireEvent.change(getSizeField(), {target: {value: '10'}})
    fireEvent.change(getTypeField(), {target: {value: 'electronic'}})
    fireEvent.click(getSubmitButton())
    // screen.debug()
    await waitFor(() =>
      expect(screen.getByText(/product stored/i)).toBeInTheDocument(),
    )
  })
})
