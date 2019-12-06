/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro'

export * from './ajax'

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
