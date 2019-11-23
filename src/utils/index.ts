/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro'

export async function showLoading() {
  return Taro.showLoading({
    mask: true,
    title: ''
  })
}

export async function hideLoading() {
  return Taro.hideLoading()
}

export async function showToast(props: Taro.showToast.Param) {
  return Taro.showToast({
    icon: 'none',
    duration: 2000,
    ...props
  })
}
