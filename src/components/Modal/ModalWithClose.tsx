import './ModalWithClose.scss'
import Taro, { Component } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { AtModalProps } from 'taro-ui/@types/modal'
import { View, Image } from '@tarojs/components'
import { CommonEventFunction } from '@tarojs/components/types/common'

export interface MWCProps extends AtModalProps {
  onCancel: CommonEventFunction
}

export default class ModalWithClose extends Component<MWCProps> {
  render() {
    return (
      <AtModal {...this.props}>
        <View className='modal-container'>
          <View className='close' onClick={this.props.onCancel}>
            <Image src={require('../../assets/popup_btn_close@3x.png')} className='icon' mode='aspectFill' />
          </View>
          {this.props.children}
        </View>
      </AtModal>
    )
  }
}
