import Taro, { createContext, RouterInfo } from '@tarojs/taro'
import { action, computed, observable, toJS } from 'mobx'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from '../utils'
import { Device, Order, Site, User, Wallet } from '../typing'
import _minBy from 'lodash.minby'
import _find from 'lodash.find'
import { ForceBindPhoneAfterRegister } from '../config'

interface LocationParam {
  latitude: number
  longitude: number
}

class AppStore {
  @observable loading = true

  @observable scene: number
  @observable shareMember: Partial<User> | undefined

  async init(params: RouterInfo['params']) {
    console.log('init', params)

    this.scene = params.scene as number

    if ((params.query as any).memberCode) {
      this.shareMember = (params.query as any) as User
    }

    if (this.scene === 1047 && params.query && (params.query as any).scene) {
      const device = { eqCode: (params.query as any).scene } as Device
      if (await this.checkDeviceIsRunning(device)) {
        await this.setScannedDevice({
          eqCode: device.eqCode
        } as Device)
      }
    }
  }

  //#region user

  @observable token = Taro.getStorageSync('client_token')

  @observable user: User | null = null
  @observable wallet: Wallet | null = null

  @computed get isUserBoundDevice() {
    return !!this.scannedDevice
  }

  @computed get isUserBoundPhone() {
    return !!(this.user && this.user.tel)
  }

  @computed get isUserHasDeposit() {
    return this.wallet && this.wallet.depositTotal
  }

  @action.bound
  async loginWithData(data: { encryptedData: string, iv: string, inviter?: string }, redirect = true) {
    showLoading()
    this.loading = true
    try {
      const { code, errMsg } = await Taro.login()
      if (!code) {
        showToast({ title: errMsg })
        return
      }
      console.debug('loginWithData', data)
      const res = await POST('base/login', {
        data: { code, ...data, eqCode: this.scannedDevice ? this.scannedDevice.eqCode : '' }
      })
      console.log(res)
      this.saveToken(res.clientToken)
      this.saveOpenId(res.openId)
      await this.fetchUserInfo()
      await this.fetchDict()

      if (ForceBindPhoneAfterRegister && !this.isUserBoundPhone) {
        Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
      } else if (redirect) {
        Taro.switchTab({ url: '/pages/home/introGuard' })
      }
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
      this.loading = false
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
  async refreshToken() {
    const openId = Taro.getStorageSync('open_id')
    if (!openId) return
    const res = await POST('base/callback/getTokenByOpenId', {
      data: { openId }
    })
    if (res) {
      this.saveToken(res.clientToken)
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
    const u = await POST('account/myAccount')
    this.user = {
      ...u,
      nickName: decodeURIComponent(u.nickName)
    }
    const wallet: Wallet = await POST('wallet/myWallet')
    const walletExt = await POST('wallet/myMemberAssetsParam')
    this.wallet = {
      ...wallet,
      balance: parseFloat(walletExt.balance || 0),
      depositTotal: parseFloat(walletExt.depositTotal || 0)
    }
    console.debug(toJS(this.user))
    console.debug(toJS(this.wallet))

    if (this.scannedDevice) {
      // 保证用户登录后能绑定到设备
      await this.setScannedDevice(this.scannedDevice)
    }
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
  @observable scannedDevice: Device

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
  @observable previewDevice: Device

  @action.bound
  async getUserLocation() {
    if (this.location) {
      return
    }
    this.location = await Taro.getLocation({ type: 'gcj02' })
  }

  @action.bound
  async setScannedDevice(cabinet: Device) {
    if (this.user) {
      try {
        this.scannedDevice = await POST('book/callback/scanEquipmentMessage', {
          data: {
            eqCode: cabinet.eqCode
          }
        })
      } catch (e) {
        defaultErrorHandler(e)
      }
    } else {
      // 未登录时
      // 设备先记录本地，在 fetchUserInfo 中再绑定
      this.scannedDevice = cabinet
    }
  }

  @action.bound
  async checkDeviceIsRunning(cabinet: Device) {
    const { runStatus } = await POST('book/callback/scanEquipmentMessage', {
      data: {
        eqCode: cabinet.eqCode
      }
    })
    return runStatus === '1'
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
  setPreviewDevice(device: Device) {
    this.previewDevice = device
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
    this.dict = await POST('dictionaries/getDictionariesList')
    console.log(toJS(this.dict))
  }

  @action.bound
  getDistValue(key, defaultValue) {
    const match = _find(this.dict, { nameEn: key })
    if (!match) return defaultValue
    return match.bz
  }

  @computed get overduePrice() {
    const value = this.getDistValue('overduePrice',0.6)
    return parseFloat(value)
  }

  @computed get buyBookDiscount() {
    const value = this.getDistValue('merchandiseDiscount',0.7)
    return parseFloat(value)
  }

  @computed get depositAmount() {
    const value = this.getDistValue('depositAmount',99)
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
