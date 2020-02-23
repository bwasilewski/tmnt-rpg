import axios from 'axios'

const BASE_PATH = `http://localhost:3001`

export const CreateAnimal = payload => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_PATH}/animal`, payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
