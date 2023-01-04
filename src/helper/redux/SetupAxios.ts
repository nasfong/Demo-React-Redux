import { Axios } from "axios"
import { Store } from "redux"

export default function setupAxios(axios: Axios, store: Store) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accept'] = 'application/json'

  // axios.defaults.withCredentials = true

  axios.interceptors.request.use(
    (config: any) => {
      const { auth: { accessToken } } = store.getState()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
}

