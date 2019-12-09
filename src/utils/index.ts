/* eslint-disable import/prefer-default-export */
export * from './ajax'

import Taro from '@tarojs/taro'
import numeral from 'numeral'

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
  }, 100)
}

export function distanceFormat(value: number) {
  return value > 1000
    ? `${numeral(value).format('0[.]0a')}m`
    : `${numeral(value).format('0')}m`
}
