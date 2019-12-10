import './index.scss'
import Taro, { useState, useContext } from '@tarojs/taro'
import { Image, View, Text, Button, Picker } from '@tarojs/components'
import ModalWithClose from '../../components/Modal/ModalWithClose'
import SCheckbox from '../../components/SCheckbox'
import AppStore from '../../store/app'
import { encodePhone } from '../../utils'

const Page: Taro.FC = () => {
  const { user, isUserBoundPhone } = useContext(AppStore)

  const [genderVisible, setGenderVisible] = useState(false)
  const [currentGender, setCurrentGender] = useState<1 | 2>(1)

  async function onFormChange() {}

  return (
    <View className='page-section' style={{ paddingTop: 0 }}>
      <View>
        <View className='cell'>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_avatar@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>我的头像</View>
          <View className='cell__ft'>
            <View className='avatar'>
              <Image src='//placehold.it/200' mode='aspectFit' />
            </View>
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
        <View className='cell'>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_name@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>我的昵称</View>
          <View className='cell__ft'>昵称A</View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
        <View className='cell'>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_phone@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>手机号码</View>
          <View className='cell__ft' onClick={() => {
            if (!isUserBoundPhone) {
              Taro.navigateTo({ url: '/pages/user-bind-phone/index' })
            } else {
              Taro.navigateTo({ url: '/pages/profile-chpwd/index' })
            }
          }}
          >
            {isUserBoundPhone
              ? <Text>{user && encodePhone(user.tel)}</Text>
              : <Text className='gray'>绑定手机号</Text>
            }
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
      </View>

      <View className='space'>
        填写宝宝信息，我们会为你推荐更适合宝宝的书籍
      </View>

      <View>
        <View className='cell'>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_name@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>宝宝昵称</View>
          <View className='cell__ft'>
            <Text className='gray'>请填写宝宝昵称</Text>
            {/*<Text>昵称A</Text>*/}
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
        <View className='cell' onClick={() => setGenderVisible(true)}>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_gender@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>宝宝性别</View>
          <View className='cell__ft'>
            <Text className='gray'>请选择宝宝性别</Text>
            {/*<Text>昵称A</Text>*/}
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
        <View className='cell'>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_birthday@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>宝宝生日</View>
          <Picker mode='date' value={'2019-01-01'} onChange={() => {}}>
            <View className='cell__ft'>
              <Text className='gray'>请填写宝宝生日</Text>
              {/*<Text>2019年1月1日</Text>*/}
            </View>
          </Picker>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
      </View>

      <ModalWithClose className='popup-modal' isOpened={genderVisible} onCancel={() => setGenderVisible(false)}>
        <View className='modal-header'>宝宝性别选择</View>
        <View className='cell'>
          <View className='cell__hd'>
            <SCheckbox value={currentGender === 1} onChange={() => setCurrentGender(1)} />
          </View>
          <View className='cell__bd'>男宝</View>
        </View>
        <View className='cell'>
          <View className='cell__hd'>
            <SCheckbox value={currentGender === 2} onChange={() => setCurrentGender(2)} />
          </View>
          <View className='cell__bd'>女宝</View>
        </View>
        <Button
          className='btn-primary btn-block'
          style={{ marginTop: '20rpx' }}
          onClick={() => onFormChange()}
        >
          确定
        </Button>
      </ModalWithClose>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '个人资料'
}

export default Page
