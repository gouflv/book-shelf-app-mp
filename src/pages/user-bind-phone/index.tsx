import './index.scss'
import Taro, { useContext, useState, useEffect, useDidShow } from '@tarojs/taro'
import { Button, Image, Input, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import DialogService from '../../store/dialogService'
import { useCountDownWithResume } from '../../utils/countdown-hook'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from '../../utils'
import BasicPageView from '../../components/BasicPageView'
import { observer } from '@tarojs/mobx'
import { ForceBindPhoneAfterRegister } from '../../config'

const Page: Taro.FC = () => {
  const { fetchUserInfo, refreshToken, user } = useContext(AppStore)
  const { showConfirm } = useContext(DialogService)

  const [hasSend, setHasSend] = useState(false)
  const { timeLeft, getTimeRemind, startCountDown, updateCountDownStamp } =
    useCountDownWithResume('user-bind-phone')

  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')

  useEffect(() => {
    if (user && user.tel) {
      setPhone(user.tel)
    }
  }, [user])

  useDidShow(() => {
    const remind = getTimeRemind()
    if (remind) {
      // @ts-ignore
      startCountDown(remind)
    }
  })

  async function onSendClick() {
    if (!validatePhone()) {
      return
    }

    showLoading()
    try {
      await POST('base/getVerificationCode', {
        data: { phone }
      })
      setSmsCode('')
      setHasSend(true)
      // @ts-ignore
      startCountDown()
      updateCountDownStamp()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  function validatePhone() {
    if (!phone) {
      showToast({ title: '请输入您的手机号' })
      return false
    }
    if (!/1\d{10}$/.test(phone)) {
      showToast({ title: '手机号输入有误，请重新输入' })
      return false
    }
    return true
  }
  function validateSmsCode() {
    if (!smsCode) {
      showToast({ title: '请输入短信验证码' })
      return false
    }
    return true
  }

  async function submit() {
    if (!validatePhone() || !validateSmsCode()) {
      return
    }
    showLoading()
    try {
      await POST('base/phoneBinding', {
        data: {
          tel: phone,
          code: smsCode.substr(0, 6)
        }
      })
      await refreshToken()
      await fetchUserInfo()
      hideLoading()
      showToast({ title: '绑定成功' })

      if (ForceBindPhoneAfterRegister) {
        Taro.switchTab({ url: '/pages/home/introGuard' })
      } else {
        setTimeout(() => {
          Taro.navigateBack()
        }, 2000)
      }

    } catch (e) {
      if (e.code === 2) {
        hideLoading()
        await showConfirm({
          title: '提示',
          content: '该手机号已被其他账户绑定，请更换绑定手机号',
          confirmText: '更换绑定手机号'
        })
        setPhone('')
        setSmsCode('')
      } else if (/验证码不正确/.test(e.message)) {
        showToast({ title: '验证码有误，请核对' })
        setSmsCode('')
      } else {
        defaultErrorHandler(e)
      }
    } finally {
      hideLoading()
    }
  }

  return (
    <BasicPageView>
      <View className='page-section'>
        <Image src={require('../../assets/login@3x.jpg')} mode='aspectFit' className='top' />

        <View className='form'>
          <View className='item'>
            <Image src={require('../../assets/phone-icon-user.png')} mode='aspectFit' className='icon' />
            <Input
              type='number'
              className='input'
              placeholder='请输入您的手机号'
              value={phone}
              onInput={e => setPhone(e.detail.value)}
              maxLength={11}
            />
            <View className='btn-clean'>
              <Image
                className='icon-close'
                src={require('../../assets/icon_input_clean.png')}
                mode='aspectFit'
                onClick={() => setPhone('')}
              />
            </View>
          </View>
          <View className='item'>
            <Image src={require('../../assets/phone-icon-lock.png')} mode='aspectFit' className='icon' />
            <Input type='number' className='input' placeholder='请输入短信验证码' value={smsCode} onInput={e => setSmsCode(e.detail.value)} />
            {timeLeft && (
              <Text className='btn-sms blue'>{(timeLeft as number) / 1000}s</Text>
            )}
            {!timeLeft && (
              <Text className='btn-sms blue' onClick={onSendClick}>
                {hasSend ? '点击重新获取' : '获取验证码'}
              </Text>
            )}
          </View>
        </View>

        <Button className='btn btn-primary submit' onClick={submit}>绑定手机号</Button>
      </View>
    </BasicPageView>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟智能机柜管理端'
}

export default observer(Page)
