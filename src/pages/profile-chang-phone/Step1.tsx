import Taro, { useContext, useDidShow, useEffect, useState } from '@tarojs/taro'
import { useCountDownWithResume } from '../../utils/countdown-hook'
import { defaultErrorHandler, encodePhone, hideLoading, POST, showLoading, showToast } from '../../utils'
import AppStore from '../../store/app'
import { Button, Text, View } from '@tarojs/components'
import NumberInput from './NumberInput'

const Step1: Taro.FC<{ onSuccess: () => void }> = props => {
  const { user } = useContext(AppStore)

  const { timeLeft, getTimeRemind, startCountDown, updateCountDownStamp } =
    useCountDownWithResume('profile-chang-phone')

  const [smsCode, setSmsCode] = useState('')
  const [hasSend, setHasSend] = useState(false)

  useDidShow(() => {
    const remind = getTimeRemind()
    if (remind) {
      // @ts-ignore
      startCountDown(remind)
    } else {
      if (!hasSend) {
        console.log('sendSms')
        sendSms()
        // @ts-ignore
        startCountDown()
        updateCountDownStamp()
        setHasSend(true)
      }
    }
  })

  //send
  async function sendSms() {
    showLoading()
    try {
      await POST('base/getMemberVerificationCode', {
        data: { phone: user && user.tel }
      })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  //commit
  async function commitSmsCode() {
    if (!smsCode) {
      showToast({ title: '请输入短信验证码' })
      return
    }

    showLoading()
    try {
      await POST('base/verifyCode', {
        data: {
          code: smsCode.substr(0, 6)
        }
      })
      props.onSuccess()
    } catch (e) {
      showToast({ title: '验证码有误，请核对' })
    } finally {
      hideLoading()
    }
  }

  useEffect(() => {
    if (smsCode.length === 6) {
      commitSmsCode()
    }
  }, [smsCode])

  return (
    <View className='step1'>
      <View className='title'>
        已发送短信验证码至
        {user && encodePhone(user.tel)}
      </View>
      <View className='desc'>
        {timeLeft > 0
          ? <Text>{(timeLeft as number) / 1000}s</Text>
          : (
            <Text onClick={() => {
              sendSms()
              // @ts-ignore
              startCountDown()
            }}
            >
              获取验证码
            </Text>
          )
        }
      </View>
      <NumberInput
        onChange={val => setSmsCode(val)}
      />
      <Button className='btn btn-primary' onClick={commitSmsCode}>下一步</Button>
    </View>
  )
}

Step1.options = {
  addGlobalClass: true
}

export default Step1
