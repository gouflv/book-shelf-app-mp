import Taro, { createContext } from '@tarojs/taro'
import { action, computed, observable, toJS } from 'mobx'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from '../utils'
import { Cabinet, Site, User, Wallet } from '../typing'
import _pick from 'lodash.pick'

import RouterInfo = Taro.RouterInfo

interface LocationParam {
  latitude: number
  longitude: number
}

class AppStore {
  @observable loading = true

  @observable scene: number
  @observable shareTicket: string | undefined

  async init(params: RouterInfo['params']) {
    console.log('init', params)
    this.scene = params.scene as number
    this.shareTicket = params.shareTicket

    if (this.token) {
      await this.fetchUserInfo()
      Taro.switchTab({ url: '/pages/index/introGuard' })
    } else {
      Taro.redirectTo({ url: '/pages/login/index' })
    }
  }

  //#region user

  @observable token = Taro.getStorageSync('client_token')
  @observable openid = null

  @observable user: User | null = null
  @observable wallet: Wallet | null = null

  @computed get isUserBoundSite() {
    // return !!~[1011, 1012, 1013].indexOf(this.scene)
    // return !!this.scanCabinet
    return true
  }

  @action.bound
  async loginWithPhoneData({ encryptedData, iv }) {
    showLoading()

    try {
      const { code, errMsg } = await Taro.login()
      if (!code) {
        showToast({ title: errMsg })
        return
      }
      console.debug('code', code, '\nencryptedData', encryptedData, '\niv', iv)
      const res = await POST('base/login', {
        data: { code, encryptedData, iv }
      })
      console.log(res)
      this.saveToken(res)
      await this.fetchUserInfo()
      Taro.switchTab({ url: '/pages/index/introGuard' })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  @action.bound
  saveToken({ clientToken }) {
    this.token = clientToken
    Taro.setStorageSync('client_token', clientToken)
  }

  @action.bound
  async fetchUserInfo() {
    this.user = await POST('account/myAccount')
    const wallet: Wallet = await POST('wallet/myWallet')
    const walletExt: Wallet = await POST('wallet/myMemberAssetsParam')
    this.wallet = {
      ...wallet,
      ..._pick(walletExt, [
        'balance',
        'depositTotal',
        'depositBalance',
        'depositOccupy',
        'freeTotal',
        'lendingcardTotal'
      ])
    }
    console.debug(toJS(this.user))
    console.debug(toJS(this.wallet))
  }

  //#endregion

  //#region site

  /**
   * 用户位置
   */
  @observable location: LocationParam | null = null

  /**
   * 用户扫码进入的网点设备
   */
  @observable scanCabinet: Cabinet

  /**
   * 网点列表
   */
  @observable siteList: Site[] = []

  /**
   * 距离最近网点
   */
  @observable closestSite: Site

  /**
   * 地图选择的网点
   */
  @observable previewSite: Site

  /**
   * 地图选择的网点设备
   */
  @observable previewCabinet: Cabinet

  @action.bound
  async getUserLocation() {
    if (this.location) {
      return
    }
    this.location = await Taro.getLocation({ type: 'gcj02' })
  }

  @action.bound
  setScanCabinet(cabinet: Cabinet) {
    this.scanCabinet = cabinet
  }

  @action.bound
  setPreviewSite(site) {
    this.previewSite = site
  }

  @action.bound
  setPreviewCabinet(cabinet) {
    this.previewCabinet = cabinet
  }

  @action.bound
  async fetchSites() {
    await this.getUserLocation()
    this.siteList = await POST('book/networkAllList', {
      data: {
        state: 1,
        ...this.location
      }
    })
  }

  //#endregion

}

export const store = new AppStore()

export default createContext(store)
