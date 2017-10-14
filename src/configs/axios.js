import axios from 'axios'
import { Loading } from 'quasar'

var axiosInstance = axios.create({
  // baseURL: 'http://lumen55.setyawan.pro/api/'
  baseURL: 'http://localhost:8000/api/'
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  Loading.show()
  return config
})

axiosInstance.interceptors.request.use(function (config) {
  Loading.show()
  return config
})

axiosInstance.interceptors.response.use(function (response) {
  Loading.hide()
  return response
}, function (error) {
  Loading.hide()
  return Promise.reject(error)
})

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return axiosInstance
      }
    }
  })
}
