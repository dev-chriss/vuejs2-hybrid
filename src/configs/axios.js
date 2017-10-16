import axios from 'axios'
import { Loading } from 'quasar'

var axiosInstance = axios.create({
  // baseURL: 'http://lumen55.setyawan.pro:8000/api/'
  baseURL: 'http://localhost:8000/api/'
})

let loadFunction = config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  Loading.show()
  return config
}
let finishFunction = response => {
  Loading.hide()
  return response
}
let errorFunction = error => {
  Loading.hide()
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(loadFunction)
axiosInstance.interceptors.response.use(finishFunction, errorFunction)

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return axiosInstance
      }
    }
  })
}
