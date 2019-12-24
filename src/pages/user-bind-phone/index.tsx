import './index.scss'
import Taro, { useContext, useState, useEffect } from '@tarojs/taro'
import { Button, Image, Input, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import DialogService from '../../store/dialogService'
import useCountDown from '../../utils/countdown-hook'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from '../../utils'
import BasicPageView from '../../components/BasicPageView'
import { observer } from '@tarojs/mobx'

const Page: Taro.FC = () => {
  const { fetchUserInfo, user } = useContext(AppStore)
  const { showConfirm } = useContext(DialogService)

  const [hasSend, setHasSend] = useState(false)
  const [timeLeft, start] = useCountDown()

  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')

  useEffect(() => {
    if (user && user.tel) {
      setPhone(user.tel)
    }
  }, [user])

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
      start()
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
          code: smsCode
        }
      })
      await fetchUserInfo()
      hideLoading()
      showToast({ title: '绑定成功' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 2000)
    } catch (e) {
      // @ts-ignore
      start(0)
      if (e.message === '输入的手机号已经被注册了') {
        hideLoading()
        await showConfirm({
          title: '提示',
          content: '该手机号已被其他账户绑定，请更换绑定手机号',
          confirmText: '更换绑定手机号'
        })
        setPhone('')
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
              className='input'
              placeholder='请输入您的手机号'
              value={phone}
              onInput={e => setPhone(e.detail.value)}
              maxLength={11}
            />
            <Image
              src={require('../../assets/icon_input_clean.png')}
              mode='aspectFit'
              className='btn-clean'
              onClick={() => setPhone('')}
            />
          </View>
          <View className='item'>
            <Image src={require('../../assets/phone-icon-lock.png')} mode='aspectFit' className='icon' />
            <Input type='digit' className='input' placeholder='请输入短信验证码' value={smsCode} onInput={e => setSmsCode(e.detail.value)} />
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
