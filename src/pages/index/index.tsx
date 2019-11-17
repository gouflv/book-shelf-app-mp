import './index.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { BG_COLOR } from '../../config'
import ShelfBooks from './ShelfBooks/index'
import UserBooks from './UserBooks'
import { AtModal } from 'taro-ui'

@observer
class Index extends Component {
  config: Config = {
    backgroundColor: BG_COLOR
  }

  render () {
    return (
      <View className='index'>
        <View className='deposit-tip'>
          <View className='content'>
            <Image src={require('../../assets/home_icon_prompt@3x.png')} mode='aspectFit' className='icon' />
            借书请先缴纳押金
          </View>
          <Button size='mini' className='btn-primary'>缴纳押金</Button>
        </View>
        <View className='space' />
        <View className='page-section'>
          <ShelfBooks />
        </View>
        <View className='space space--text'>
          <View className='text'>你已看过的书</View>
        </View>
        <View className='page-section'>
          <UserBooks />
        </View>
        <View className='space' />

        <AtModal isOpened>
          ModalClose
        </AtModal>
      </View>
    )
  }
}

export default Index
