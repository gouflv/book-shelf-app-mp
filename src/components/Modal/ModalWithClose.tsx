import './ModalWithClose.scss'
import _omit from 'lodash/omit'
import Taro, { Component } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { AtModalProps } from 'taro-ui/@types/modal'
import { View, Image } from '@tarojs/components'
import { CommonEventFunction } from '@tarojs/components/types/common'

export interface MWCProps extends AtModalProps {
  onCancel: CommonEventFunction
}

export default class ModalWithClose extends Component<MWCProps> {
  static options = {
    addGlobalClass: true
  }

  render() {
    const modalProps = _omit(this.props, 'children')
    return (
      <AtModal {...modalProps}>
        <View className='modal-container'>
          <View className='modal-close' onClick={this.props.onCancel}>
            <Image src={require('../../assets/popup_btn_close@2x.png')} className='icon' mode='aspectFill' />
          </View>
          {this.props.children}
        </View>
      </AtModal>
    )
  }
}
