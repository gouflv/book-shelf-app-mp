import Taro, { createContext } from '@tarojs/taro'
import { action, computed, observable } from 'mobx'
import { hideLoading, POST, showLoading, showToast } from '../utils'
import { User } from '../typing'
import RouterInfo = Taro.RouterInfo

interface LocationParam {
  latitude: number
  longitude: number
}

class AppStore {
  @observable
  loading = true

  @observable
  scene: number

  @observable
  shareTicket: string | undefined

  init(params: RouterInfo['params']) {
    console.log('init', params)
    this.scene = params.scene as number
    this.shareTicket = params.shareTicket
  }

  @computed get isBoundSite() {
    return !!~[1011, 1012, 1013].indexOf(this.scene)
  }

  //#region user

  @observable
  token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJOMzU1MTM5NDc1MzQ1MDE4ODgwIiwiaWF0IjoxNTc0OTMzNTEwLCJleHAiOjE1NzU1MzgzMTB9.FAkNoiHiNV78RqBnB9xcgg1uLSLU2oKCW5OOQYnMF5m6qYN8rIfwTiz03nqeazgkkwm7DnK54DIqvgfgYe1tbPZSV6rI6oJiu4vP_yC9yoWFnJawzayxAASJlFy22jvqDKyOrrT7Szydd8F5jCI-4yJH07R6er3IXmCglp_Lo1GfnqquZWomvA2yOrYv2OUh6-bT-33Q9bhCPO3wuzSYBL6L2Da9fCoBJ_PMyGZbkjblS6961QwnPJOQdjLEdlcj4A7IP2hlh6hNNsRUWpiyrnX4n75fKXLaYtW_UQ7h2DOMXrdRY6K9n-b7Nin0onLFIDyOc9q2KSsc-cehdcE4nw'

  @observable user: User | null = null

  @computed get isUserBoundSite() {
    return false
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

  @observable siteList = []
  @observable currentSite = null
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

  @action.bound
  async fetchClosestSite() {
    await this.getUserLocation()
    const data = await POST('book/networkAllList', {
      data: {
        state: 1,
        ...this.location
      }
    })
    console.log(data)
    this.siteList = data
  }

  //#endregion

}

export const store = new AppStore()

export default createContext(store)
