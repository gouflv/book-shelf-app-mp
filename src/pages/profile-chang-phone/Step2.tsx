import Taro, { useContext, useState } from '@tarojs/taro'
import useCountDown from '../../utils/countdown-hook'
import { defaultErrorHandler, encodePhone, hideLoading, POST, showLoading, showToast } from '../../utils'
import AppStore from '../../store/app'
import DialogService from '../../store/dialogService'
import { Button, Input, View } from '@tarojs/components'

const Step2: Taro.FC = () => {
  const { fetchUserInfo } = useContext(AppStore)
  const { showAlert } = useContext(DialogService)

  const [smsCode, setSmsCode] = useState('')
  const [hasSend, setHasSend] = useState(false)
  const [timeLeft, startCountDown] = useCountDown()
  const [phone, setPhone] = useState('')

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

      await showAlert({
        content: `手机号更换完成，请牢记您的新账号\n${encodePhone(phone)} 用于登录`
      })
      Taro.navigateBack()

    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  return (
    <View className='step2'>
      <View className='form'>
        <View className='form-item'>
          <Input type='number' className='input' placeholder='请输入您要绑定的新手机号' value={phone} onInput={e => setPhone(e.detail.value)} />
        </View>
        <View className='form-item'>
          <Input type='number' className='input' placeholder='请输入短信验证码' onInput={e => setSmsCode(e.detail.value)} />
          <Button
            className='btn btn--plain orange btn-send'
            size='mini'
            onClick={() => {
              if (!timeLeft) {
                onSendClick()
              }
            }}
          >
            {timeLeft
              ? `${(timeLeft as number) / 1000}s`
              : hasSend ? '点击重新获取' : '获取验证码'
            }
          </Button>
        </View>
      </View>
      <Button className='btn btn-primary' onClick={submit}>确认更换</Button>
    </View>
  )
}

Step2.options = {
  addGlobalClass: true
}

export default Step2
