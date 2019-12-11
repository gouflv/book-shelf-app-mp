import './index.scss'
import Taro, { useState, useContext, useEffect, showModal } from '@tarojs/taro'
import { Button, Input, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { defaultErrorHandler, encodePhone, hideLoading, POST, showLoading, showToast } from '../../utils'
import useCountDown from '../../utils/countdown-hook'
import NumberInput from './NumberInput'

const Page: Taro.FC = () => {
  const { user, fetchUserInfo } = useContext(AppStore)
  const [step, setStep] = useState(1)

  //#region step1
  const [timeLeft, start] = useCountDown()
  const [smsCode, setSmsCode] = useState('')
  async function sendSms() {
    showLoading()
    try {
      await POST('base/getVerificationCode', {
        data: { phone: user && user.tel }
      })
      // @ts-ignore
      // start()
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }
  async function commitSmsCode() {
    if (!smsCode) {
      showToast({ title: '请输入短信验证码' })
      return
    }
    // @ts-ignore
    start(0)

    showLoading()
    try {
      //TODO 验证修改密码授权
      setStep(1)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }

  }

  useEffect(() => {
    sendSms()
  }, [])

  useEffect(() => {
    if (smsCode.length === 6) {
      commitSmsCode()
    }
  }, [smsCode])
  //#endregion

  //#region step2
  const [hasSend, setHasSend] = useState(false)
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
    if (!/1\d{10}/.test(phone)) {
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
      await showModal({
        content: `手机号更换完成，请牢记您的新账号\n${encodePhone(phone)} 用于登录`,
        showCancel: false
      })
      Taro.navigateBack()
    } catch (e) {
      // @ts-ignore
      start(0)
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }


  return (
    <View className='page-section'>
      {step === 0 && (
        <View className='step1'>
          <View className='title'>
            已发送短信验证码至
            {user && encodePhone(user.tel)}
          </View>
          <View className='desc'>
            {(timeLeft as number) / 1000}s
          </View>
          <NumberInput
            onChange={val => setSmsCode(val)}
          />
          <Button className='btn btn-primary' onClick={() => setStep(1)}>下一步</Button>
        </View>
      )}

      {step === 1 && (
        <View className='step2'>
          <View className='form'>
            <View className='form-item'>
              <Input className='input' placeholder='请输入您要绑定的新手机号' value={phone} onInput={e => setPhone(e.detail.value)} />
            </View>
            <View className='form-item'>
              <Input type='digit' className='input' placeholder='请输入短信验证码' />
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
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '手机号更换'
}

export default Page
