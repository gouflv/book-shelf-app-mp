/* eslint-disable import/prefer-default-export */
import { PaymentRequestParams } from '../typing'

export * from './ajax'

import Taro from '@tarojs/taro'
import numeral from 'numeral'
import { defaultErrorHandler, POST } from './ajax'

export function showLoading(props?: Partial<Taro.showLoading.Param>) {
  Taro.showLoading({
    mask: true,
    title: '',
    ...props
  })
}

export function hideLoading() {
  Taro.hideLoading()
}

export function showToast(props: Taro.showToast.Param) {
  setTimeout(() => {
    Taro.showToast({
      icon: 'none',
      duration: 2000,
      ...props
    })
  }, 1)
}

export function distanceFormat(value: number) {
  return value > 1000
    ? `${numeral(value).format('0[.]0a')}m`
    : `${numeral(value).format('0')}m`
}

export function moneyFormat(value: string | number | null) {
  return numeral(value).format('0[.]00')
}

export function encodePhone(val: string) {
  return val.replace(/(\d{3})(\d{4})(.*)/, (_match, $1, _$2, $3) => {
    return [$1, '****', $3].join('')
  })
}

export async function submitPayment({ url, data }) {
  showLoading()
  try {
    const params: PaymentRequestParams = await POST(url, { data })
    if (!params) {
      return
    }
    await Taro.requestPayment(params)
  } catch (e) {
    defaultErrorHandler(e)
    throw e
  } finally {
    hideLoading()
  }
}
