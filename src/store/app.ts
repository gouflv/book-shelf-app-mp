import Taro, { createContext } from '@tarojs/taro'
import { action, computed, observable } from 'mobx'
import { hideLoading, showLoading } from '../utils'

interface User  {
  name
  siteId
}
interface LocationParam {
  latitude: number
  longitude: number
}

class AppStore {
  @observable
  loading = true

  //#region user

  @observable user: User | null = null

  @computed get isUserBoundSite() {
    return this.user && this.user.siteId
  }

  @action.bound
  wxLogin() {
    showLoading()
    setTimeout(() => {
      // this.fetchUserInfo()
      this.loading = false
      hideLoading()
    }, 3000)
  }

  @action.bound
  fetchUserInfo() {
    this.user = { name: 'gg', siteId: 1 }
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
