import axios from "axios";
import { useMutation } from "react-query";

import {baseUrl} from './../../config'
import {Inputs} from './login-page.interfaces'


const loginService = async (email: string, password: string): Promise<void> =>
    {
    console.log("login.post", { email, password });
//  return axios.post(`${baseUrl}/login`, {
//     email,
//     password,
//   })
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    // console.log(response);    
    return response.data;
  } catch (error) {
    // console.log(error);    
    throw error; // Lanza el error para que sea manejado por useMutation
  }

}

export const useLoginMutation = () =>
  useMutation((payload: Inputs) =>
    loginService(payload.email, payload.password),
  )

