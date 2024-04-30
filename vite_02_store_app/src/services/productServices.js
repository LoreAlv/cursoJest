import axios from 'axios'

export const saveProduct = () => {
  return axios.post('http://localhost/products', {
    params: JSON.stringify({}),
  })
}
export default {saveProduct}
