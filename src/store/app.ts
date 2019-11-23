import { createContext } from '@tarojs/taro'
import { action, observable } from 'mobx'

class AppStore {
  @observable
  user: any = null

  constructor() {
    setTimeout(() => {
      this.fetchUserInfo()
    }, 3000)
  }

  @action.bound
  fetchUserInfo() {
    this.user = { name: 'gg' }
  }
}

export default createContext(new AppStore())
