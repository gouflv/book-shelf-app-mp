import './index.scss'
import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import BasicPageView from '../../components/BasicPageView'
import Step1 from './Step1'
import Step2 from './Step2'

const Page: Taro.FC = () => {
  const [step, setStep] = useState<0 | 1>(0)
  return (
    <BasicPageView>
      <View className='page-section'>
        {step === 0 && (
          <Step1 onSuccess={() => setStep(1)} />
        )}
        {step === 1 && (
          <Step2 />
        )}
      </View>
    </BasicPageView>
  )
}

Page.config = {
  navigationBarTitleText: '手机号更换'
}

export default Page
