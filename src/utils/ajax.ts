/* eslint-disable import/prefer-default-export */
import Taro, { request } from '@tarojs/taro'
import { API_BASE } from '../config'
import { showToast } from './index'
import { app } from '../store/app'

interface AjaxOptions extends Partial<request.Option> {}

interface AjaxError {
  handler: boolean
  code: number
  message: string
}

export const ajax = (url, options?: AjaxOptions) =>
  new Promise<any | AjaxError>(async (resolve, reject) => {
    const params: request.Option = {
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        clientToken: app.token
      },
      url: `${API_BASE}/${url}`,
      ...options
    }
    try {
      const res = await Taro.request(params)
      const { data, statusCode } = res

      if (statusCode === 500) {
        showToast({ title: '服务繁忙, 请稍后再试' })
        reject({ handler: true })
        return
      }

      if (data && data.code === 999) {
        reject({ handler: true })
        app.tryFetchTokenByLocalOpenId()
        return
      }

      if (data && (data.code !== 0 && data.code !== 200)) {
        reject({ ...res.data, handler: false })
      }

      resolve(data.data || {})
    } catch (e) {
      showToast({ title: '网络开小差了' })
      reject({ ...e, handler: true })
    }
  })

export const GET = async (url, options?: AjaxOptions) => ajax(url, options)
export const POST = async (url, options?: AjaxOptions) => ajax(url, { ...options, method: 'POST' })

export const defaultErrorHandler = e => {
  console.error(e)
  if (e.handler) return
  if (e.message) {
    showToast({ title: e.message })
  }
}
