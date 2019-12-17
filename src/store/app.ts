import Taro, { createContext, RouterInfo } from '@tarojs/taro'
import { action, computed, observable, toJS } from 'mobx'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from '../utils'
import { Cabinet, Order, Site, User, Wallet } from '../typing'
import _minBy from 'lodash.minby'
import _find from 'lodash.find'

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
    this.shareTicket = (params.query as any).memberCode

    if (this.scene === 1047 && params.query && (params.query as any).scene) {
      this.setScanCabinet({
        eqCode: (params.query as any).scene
      } as Cabinet)
    }
  }

  //#region user

  @observable token = Taro.getStorageSync('client_token')

  @observable user: User | null = null
  @observable wallet: Wallet | null = null

  @computed get isUserBoundDevice() {
    return !!this.scanCabinet
  }

  @computed get isUserBoundPhone() {
    return this.user && this.user.tel
  }

  @computed get isUserHasDeposit() {
    return this.wallet && this.wallet.depositTotal
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
        data: {
          code,
          encryptedData: encodeURIComponent(encryptedData),
          iv
        }
      })
      console.log(res)
      this.saveToken(res.clientToken)
      this.saveOpenId(res.openId)
      await this.fetchUserInfo()
      await this.fetchDict()
      Taro.switchTab({ url: '/pages/home/introGuard' })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  @action.bound
  async tryFetchTokenByLocalOpenId() {
    const openId = Taro.getStorageSync('open_id')
    if (!openId) {
      Taro.reLaunch({ url: '/pages/login/index' })
      return
    }
    const res = await POST('base/callback/getTokenByOpenId', {
      data: { openId }
    })
    if (res) {
      this.saveToken(res.clientToken)
      Taro.reLaunch({ url: '/pages/index/index' })
    }
  }

  @action.bound
  saveToken(clientToken) {
    this.token = clientToken
    Taro.setStorageSync('client_token', clientToken)
  }

  @action.bound
  saveOpenId(open_id) {
    Taro.setStorageSync('open_id', open_id)
  }

  @action.bound
  async fetchUserInfo() {
    this.user = await POST('account/myAccount')
    const wallet: Wallet = await POST('wallet/myWallet')
    const walletExt = await POST('wallet/myMemberAssetsParam')
    this.wallet = {
      ...wallet,
      balance: parseFloat(walletExt.balance || 0),
      depositTotal: parseFloat(walletExt.depositTotal || 0)
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
  setClosestSite(site: Site) {
    this.closestSite = site
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
    if (this.location) {
      const { longitude, latitude } = this.location
      this.siteList = await POST('book/networkAllList', {
        data: {
          state: 1,
          longitude,
          latitude
        }
      })
      const closest = _minBy(this.siteList, site => {
        return parseInt(site.distance)
      })
      if (closest) {
        this.setClosestSite(closest)
      }
    }
  }

  //#endregion

  //#region dict
  @observable dict: { nameEn: string, bz: string }[]

  @action.bound
  async fetchDict() {
    await POST('dictionaries/getDictionariesList')
  }

  getDistValue(key, defaultValue) {
    const match = _find(this.dict, { nameEn: key })
    if (!match) return defaultValue
    return match.bz
  }

  getOverduePrice() {
    const value = this.getDistValue('overduePrice',0.6)
    return parseFloat(value)
  }

  getBuyBookDiscount() {
    const value = this.getDistValue('merchandiseDiscount',0.7)
    return parseFloat(value)
  }

  //#endregion

  //#region other
  @observable currentOrder: Order | null

  @action.bound
  setCurrentOrder(val: Order) {
    this.currentOrder = val
  }
  //#endregion

}

export const app = new AppStore()

export default createContext(app)
