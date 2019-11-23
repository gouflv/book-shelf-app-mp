import './index.scss'
import Taro, { useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui'

const Page: Taro.FC = () => {
  const [confirmVisible, setConfirmVisible] = useState(true)

  function onGetBackClick() {
    setConfirmVisible(true)
  }

  function submitGetBack() {
    // TODO
  }

  return (
    <View className='page page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/deposit_bg@3x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>押金</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            199
          </View>
          <Button className='btn btn--round' size='mini'>补缴押金</Button>
        </View>
      </View>

      <View className='page-section'>
        <View className='section-header'>
          押金记录
        </View>
        <View className='card'>
          <View className='cell-group'>
            <View className='cell'>
              <View className='cell__bd'>
                <View className='label'>[缴纳]缴纳押金</View>
                <Text className='desc gray'>2019/11/12 18:00</Text>
              </View>
              <View className='cell__ft'>
                <View className='money red'>
                  +<Text className='money-unit money-unit--large'>¥</Text>
                  99
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd'>
                <View className='label'>[缴纳]缴纳押金</View>
                <Text className='desc gray'>2019/11/12 18:00</Text>
              </View>
              <View className='cell__ft'>
                <View className='money green'>
                  -<Text className='money-unit money-unit--large'>¥</Text>
                  99
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='page-section' style={{ paddingTop: 0 }}>
        <View className='card'>
          <View className='cell-group'>
            <View className='cell' onClick={onGetBackClick}>
              <View className='cell__bd orange'>
                退回押金
              </View>
              <View className='cell-ft' />
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>
          </View>
        </View>
      </View>

      <AtModal
        isOpened={confirmVisible}
        className='get-back-confirm'
        onCancel={() => submitGetBack()}
        onConfirm={() => setConfirmVisible(false)}
      >
        <AtModalContent>
          <View className='title'>是否确认退还押金？</View>
          <Image src={require('../../assets/deposit_icon_sad@3x.png')} mode='aspectFit' className='img' />
          <View className='content red'>再给宝宝多看两本书吧</View>
        </AtModalContent>
        <AtModalAction>
          <Button className='gray'>想好了，退押金</Button>
          <Button className='orange'>不退了，留下</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default Page
