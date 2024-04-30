import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './form'
// import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock'
import axios from 'axios'

const host = 'http://localhost:5173'

axios.defaults.host = host
axios.defaults.baseURL = host
// axios.defaults.adapter = httpAdapter

nock(host)
  .persist()
  .post('/products')
  .delay(100)
  .reply(201, {token: 'mocked_user_token'})

const getSubmitButton = () => screen.getByRole('button', {name: /submit/i})
const getNameField = () => screen.getByLabelText(/name/i)
const getSizeField = () => screen.getByLabelText(/size/i)
const getTypeField = () => screen.getByLabelText(/type/i)

describe('when the user submits the form', () => {
  beforeAll(() => {
    nock.restore()
  })

  test('should disable the submit button until request is done', async () => {
    //Así simulamos que se ejecuta el post pero no creamos el usuario nuevo
    const spy = jest.spyOn(axios, 'post').mockReturnValue({
      data: {
        token: 'aklsdf',
      },
    })
    render(<Form />)
    expect(getSubmitButton()).not.toBeDisabled()
    fireEvent.click(getSubmitButton())
    expect(getSubmitButton()).toBeDisabled()
    //ahora esperamos respuesta y debe activarse de nuevo
    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
  })
})
