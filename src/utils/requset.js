import axios from 'axios'
import store from '../store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截
request.interceptors.request.use((config) => {
  const {user} = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
  return config
}, (error) => {
  return error
})

// 响应拦截


export default request
