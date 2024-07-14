import { router } from '@inertiajs/react'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const httpServer = axios.create({
  baseURL:`https://backend-bcr.fly.dev`
})

httpServer.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem('auth_token') || ''
    
    config.headers.Authorization = `Bearer ${token}`
    
    console.log(config.headers.Authorization)
    
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

httpServer.interceptors.response.use(
  (response: AxiosResponse) => {
    if(response.status == 200) {
      return response
    }
    else {
      return Promise.reject({message: 'Unauthorized'})
    }
  },
  (error: AxiosError) => {
    if(error.response && error.response.status != 200) {
      
      localStorage.removeItem('auth_token')
      
      // router.get('/')
      
    } else {
      return Promise.reject(error)
    }
  }
)

export  {
  httpServer 
}