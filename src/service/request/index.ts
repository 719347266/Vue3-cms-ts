import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios的实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    ),
      // 全局响应拦截
      this.instance.interceptors.response.use(
        (res) => {
          this.loading?.close()
          // 全局成功的响应拦截
          const data = res.data
          if (data.returnCode === '-1001') {
            console.log('错误信息')
          } else {
            return data
          }
        },
        (err) => {
          this.loading?.close()
          // 全局失败的响应拦截
          // 例子: 判断不同的HttpErrorCode显示不同的错误信息
          if (err.response.status === 404) {
            console.log('404的错误~')
          }
          return err
        }
      )
  }
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断有没有单实例的请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
          this.showLoading = DEAFULT_LOADING
          // 响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
        })
        .catch((err) => {
          reject(err)
          this.showLoading = DEAFULT_LOADING
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
