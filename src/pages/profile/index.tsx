import './index.scss'
import Taro, { useContext, useState, useEffect } from '@tarojs/taro'
import { Image, Input, View, Text, Button, Picker } from '@tarojs/components'
import AppStore from '../../store/app'
import { encodePhone, hideLoading, POST, showLoading } from '../../utils'
import ModalWithClose from '../../components/Modal/ModalWithClose'
import SCheckbox from '../../components/SCheckbox'
import { observer } from '@tarojs/mobx'
import dayjs from 'dayjs'
import useBindPhone from '../../utils/bind-phone-hook'

type UpdateProps = Partial<{ nickName, childName, childSex, childBirthday }>

function isString(val) {
  return typeof val === 'string'
}

const Page: Taro.FC = () => {
  const { user, isUserBoundPhone, fetchUserInfo } = useContext(AppStore)
  const { onGetPhoneNumber } = useBindPhone()

  const [nameInputVisible, setNameInputVisible] = useState(false)
  const [childNameInputVisible, setChildNameInputVisible] = useState(false)
  const [childGender, setChildGender] = useState<'1' | '2'>()
  const [childGenderVisible, setChildGenderVisible] = useState(false)

  function setFormData() {
    console.log('setFormData')
    if (user) {
      setChildGender(user.childSex as any || '')
    }
  }
  useEffect(() => {
    user && setFormData()
  }, [user])

  let loading = false
  async function onFormChange(value: UpdateProps = {}) {
    if (loading) {
      return
    }
    loading = true

    const data = value
    if (isString(value.nickName)) {
      data.nickName = value.nickName
    }
    if (isString(value.childName)) {
      data.childName = value.childName
    }
    if (childGender) {
      data.childSex = childGender
    }
    showLoading()
    await POST('account/updateMemberDetail', {
      data
    })
    await fetchUserInfo()
    hideLoading()
    setNameInputVisible(false)
    setChildNameInputVisible(false)
    setChildGenderVisible(false)

    loading = false
  }

  if (!user) {
    return <View />
  }
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
              <Image src={user ? user.image : '//placehold.it/200'} mode='aspectFit' />
            </View>
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>

        <View className='cell' onClick={() => setNameInputVisible(true)}>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_name@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>我的昵称</View>
          <View className='cell__ft'>
            {nameInputVisible
              ? (
                <Input
                  className='input'
                  value={user.nickName || ''}
                  confirmType='done'
                  onConfirm={e => onFormChange({ nickName: e.detail.value })}
                  onBlur={e => onFormChange({ nickName: e.detail.value })}
                  focus
                />
              )
              : user.nickName
                ? <Text>{user.nickName}</Text>
                : <Text className='gray'>请填写昵称</Text>
            }
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>

        <View className='cell' onClick={() => {
          if (isUserBoundPhone) {
            Taro.navigateTo({ url: '/pages/profile-chang-phone/index' })
          }
        }}
        >
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_phone@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>手机号码</View>
          <View className='cell__ft'>
            {isUserBoundPhone
              ? <Text>{user && encodePhone(user.tel)}</Text>
              : (
                <Button
                  className='btn btn-get-phone'
                  openType='getPhoneNumber'
                  onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
                >绑定手机号</Button>
              )
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
        <View className='cell' onClick={() => setChildNameInputVisible(true)}>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_name@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>宝宝昵称</View>
          <View className='cell__ft'>
            {childNameInputVisible
              ? (
                <Input
                  className='input'
                  value={user.childName}
                  confirmType='done'
                  onConfirm={e => onFormChange({ childName: e.detail.value })}
                  onBlur={e => onFormChange({ childName: e.detail.value })}
                  focus
                />
              )
              : user.childName
                ? <Text>{user.childName}</Text>
                : <Text className='gray'>请填写宝宝昵称</Text>
            }
          </View>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>

        <View className='cell' onClick={() => setChildGenderVisible(true)}>
          <View className='cell__hd'>
            <Image src={require('../../assets/personal_icon_gender@2x.png')} mode='aspectFit' />
          </View>
          <View className='cell__bd'>宝宝性别</View>
          <View className='cell__ft'>
            {user.childSex
              ? <Text>{ user.childSex === '1' ? '男' : '女' }</Text>
              : <Text className='gray'>请选择宝宝性别</Text>
            }
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
          <Picker
            mode='date'
            value='2010-01-01'
            end={dayjs().format('YYYY-MM-DD')}
            onChange={e => onFormChange({ childBirthday: e.detail.value })}
          >
            <View className='cell__ft'>
              {user.childBirthday
                ? <Text>{dayjs(user.childBirthday).format('YYYY-MM-DD')}</Text>
                : <Text className='gray'>请填写宝宝生日</Text>
              }
            </View>
          </Picker>
          <View className='cell__link'>
            <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
          </View>
        </View>
      </View>

      <ModalWithClose className='popup-modal' isOpened={childGenderVisible} onCancel={() => setChildGenderVisible(false)}>
        <View className='modal-header'>宝宝性别选择</View>
        <View className='cell' onClick={() => setChildGender('1')}>
          <View className='cell__hd'>
            <SCheckbox value={childGender === '1'} />
          </View>
          <View className='cell__bd'>男宝</View>
        </View>
        <View className='cell'  onClick={() => setChildGender('2')}>
          <View className='cell__hd'>
            <SCheckbox value={childGender === '2'} />
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

export default observer(Page)
