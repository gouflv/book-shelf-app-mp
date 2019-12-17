import { action, observable } from 'mobx'
import { createContext } from '@tarojs/taro'
import { DialogProps } from '../components/Dialog'

class DialogService {
  @observable dialogVisible = false
  @observable dialogOptions: Partial<DialogProps> = {}

  @action.bound
  async showConfirm(options: Partial<DialogProps>) {
    return new Promise((resolve, reject) => {
      this.dialogOptions = {
        onClose: () => {
          this.dialogVisible = false
          reject()
        },
        onCancel: () => {
          this.dialogVisible = false
          reject()
        },
        onConfirm: () => {
          this.dialogVisible = false
          resolve()
        },
        ...options
      }
      this.dialogVisible = true
    })
  }

  @action.bound
  async showAlert(options: Partial<DialogProps>) {
    return new Promise((resolve, reject) => {
      this.dialogOptions = {
        hideCancel: true,
        onClose: () => {
          this.dialogVisible = false
          reject()
        },
        onConfirm: () => {
          this.dialogVisible = false
          resolve()
        },
        ...options
      }
      this.dialogVisible = true
    })
  }
}

export default createContext(new DialogService())
