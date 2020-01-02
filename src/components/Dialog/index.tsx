import './index.scss'
import Taro from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { Button, View } from '@tarojs/components'
import { AtModalProps } from 'taro-ui/@types/modal'

export interface DialogProps extends AtModalProps {
  hideCancel?: boolean
  confirmOpenType?: 'getPhoneNumber'
  onGetPhoneNumber?: (e: any) => {}
}

const Dialog: Taro.FC<DialogProps> = props => {
  return (
    <AtModal isOpened={props.isOpened} className='dialog'>
      <View className='dialog__content'>
        {props.title && (
          <View className='dialog__title'>{props.title}</View>
        )}
        <View className='dialog__message'>{props.content}</View>
      </View>
      <View className='dialog__footer'>
        {!props.hideCancel && (
          <Button className='btn dialog__cancel-btn' onClick={props.onCancel}>
            {props.cancelText || '取消'}
          </Button>
        )}
        {props.confirmOpenType
          ? (
            <Button
              className='btn dialog__confirm-btn'
              openType={props.confirmOpenType}
              onGetPhoneNumber={e => {
                props.onGetPhoneNumber && props.onGetPhoneNumber(e)
                props.onConfirm && props.onConfirm(e)
              }}
            >
              {props.confirmText || '确定'}
            </Button>
          )
          : (
            <Button className='btn dialog__confirm-btn' onClick={props.onConfirm}>
              {props.confirmText || '确定'}
            </Button>
          )
        }
      </View>
    </AtModal>
  )
}

Dialog.options = {
  addGlobalClass: true
}

export default Dialog
