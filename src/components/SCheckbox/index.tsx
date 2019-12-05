import './index.scss'
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'

interface SCheckboxProps {
  value: boolean
  onChange: (value) => void
}

const SCheckbox: Taro.FC<SCheckboxProps> = props => {
  function onClick() {
    props.onChange(!props.value)
  }

  return props.value
    ? <Image
      src={require('../../assets/buy_btn_selected@2x.png')}
      mode='aspectFit' className='checkbox'
      onClick={onClick}
    />
    : <Image
      src={require('../../assets/buy_btn_normal@2x.png')}
      mode='aspectFit' className='checkbox'
      onClick={onClick}
    />
}

export default SCheckbox
