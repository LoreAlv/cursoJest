import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './form'
// import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'
import axios from 'axios'
import moxios from 'moxios'
import {CREATED_STATUS} from '../consts/httpStatus'

const host = 'http://localhost:5173'

axios.defaults.host = host
axios.defaults.baseURL = host
// axios.defaults.adapter = 'http'

const getSubmitButton = () => screen.getByRole('button', {name: /submit/i})
const getNameField = () => screen.getByLabelText(/name/i)
const getSizeField = () => screen.getByLabelText(/size/i)
const getTypeField = () => screen.getByLabelText(/type/i)

describe('when the user submits the form', () => {
  beforeAll(() => {
    nock.restore()
    jest.clearAllMocks()
  })
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    nock.restore()
    jest.clearAllMocks()
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })
  test('should disable the submit button until request is done', async () => {
    //Así simulamos que se ejecuta el post pero no creamos el usuario nuevo
    const spy = jest.spyOn(axios, 'post').mockReturnValue({
      data: {
        token: 'aklsdf',
      },
    })

    // nock(host)
    //   .persist()
    //   .post('/products')
    //   .delay(100)
    //   .reply(201, {token: 'mocked_user_token'})

    moxios.stubRequest('http://localhost/products', {
      status: CREATED_STATUS,
      responseText: {token: 'mocked_user_token'},
    })
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    expect(getSubmitButton()).toBeDisabled()
    //ahora esperamos respuesta y debe activarse de nuevo
    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('should the form page must display the success message _“Product stored”_ and clean the fields values', async () => {
    const spy = jest.spyOn(axios, 'post').mockReturnValue({
      type: 'default',
      status: 201,
      ok: true,
      statusText: 'OK',
      body: {
        token: 'aklsdf',
      },
    })
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    // screen.debug()
    await waitFor(() =>
      expect(screen.getByText(/product stored/i)).toBeInTheDocument(),
    )
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
