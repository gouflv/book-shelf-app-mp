import Taro, { createContext } from '@tarojs/taro'
import { action, computed, observable } from 'mobx'
import { hideLoading, POST, showLoading, showToast } from '../utils'
import { User } from '../typing'

interface LocationParam {
  latitude: number
  longitude: number
}

class AppStore {
  @observable
  loading = true


  //#region user

  @observable
  token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJOMzU1MTM5NDc1MzQ1MDE4ODgwIiwiaWF0IjoxNTc0OTMzNTEwLCJleHAiOjE1NzU1MzgzMTB9.FAkNoiHiNV78RqBnB9xcgg1uLSLU2oKCW5OOQYnMF5m6qYN8rIfwTiz03nqeazgkkwm7DnK54DIqvgfgYe1tbPZSV6rI6oJiu4vP_yC9yoWFnJawzayxAASJlFy22jvqDKyOrrT7Szydd8F5jCI-4yJH07R6er3IXmCglp_Lo1GfnqquZWomvA2yOrYv2OUh6-bT-33Q9bhCPO3wuzSYBL6L2Da9fCoBJ_PMyGZbkjblS6961QwnPJOQdjLEdlcj4A7IP2hlh6hNNsRUWpiyrnX4n75fKXLaYtW_UQ7h2DOMXrdRY6K9n-b7Nin0onLFIDyOc9q2KSsc-cehdcE4nw'

  @observable user: User | null = null

  @computed get isUserBoundSite() {
    return true
  }

  @action.bound
  async login() {
    showLoading()

    // await this.wxLogin()
    await this.fetchUserInfo()

    this.loading = false
    hideLoading()
  }

  @action.bound
  async wxLogin() {
    const { code, errMsg } = await Taro.login()
    if (!code) {
      showToast({ title: errMsg })
      throw new Error(errMsg)
    }
    console.log('login', code)
    const data = await POST('base/login', {
      data: { code }
    })
    //TODO save token
    return code
  }

  @action.bound
  async fetchUserInfo() {
    this.user = await POST('account/myAccount')
  }

  //#endregion

  //#region site

  @observable location: LocationParam | null = null

  @observable previewSite = null

  @action.bound
  async getUserLocation() {
    if (this.location) {
      return
    }
    this.location = await Taro.getLocation({ type: 'gcj02' })
  }

  @action.bound
  setPreviewSite(site) {
    this.previewSite = site
  }

  //#endregion

}

export const store = new AppStore()

export default createContext(store)
