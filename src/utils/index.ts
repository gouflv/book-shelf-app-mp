/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro'

export * from './ajax'

export async function showLoading(props?: Partial<Taro.showLoading.Param>) {
  return Taro.showLoading({
    mask: true,
    title: '',
    ...props
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
