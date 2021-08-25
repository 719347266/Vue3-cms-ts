// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

// import { ElNotification } from 'element-plus'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseInterceptor: (res) => {
      return res
    }
  }
})

export default hyRequest
