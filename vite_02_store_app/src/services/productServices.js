import axios from 'axios'

export const saveProduct = ({name, size, type}) => {
  //   console.log({name, size, type})
  //   console.log(JSON.stringify({name, size, type}))
  return axios.post(
    'http://localhost/products',
    {
      name: name,
      size: size,
      type: type,
      // params: JSON.stringify({name, size, type}),
    },
    // JSON.parse({name, size, type}),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
export default {saveProduct}
