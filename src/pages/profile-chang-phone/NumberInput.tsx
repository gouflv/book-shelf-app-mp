import { Input, View } from '@tarojs/components'
import Taro, { useState } from '@tarojs/taro'
import classNames from 'classnames'

interface NumberInputOneProps {
  onChange: (val: string) => void
}

const NumberInput: Taro.FC<NumberInputOneProps> = props => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(true)

  function getValueOfIndex(index: number) {
    return value.charAt(index) || ''
  }

  function onInput(val) {
    setValue(val)
    props.onChange(val)
  }

  return (
    <View
      className='number-input'
      onClick={() => {
        setTimeout(() => setFocus(true), 10)
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <View
            key={index}
            className={classNames('num', { 'num--active': getValueOfIndex(index) })}
          >
            {getValueOfIndex(index)}
          </View>
        )
      })}
      <Input
        type='number'
        maxLength={6}
        focus={focus}
        className='input'
        value={value}
        onInput={e => onInput(e.detail.value)}
        onBlur={() => setFocus(false)}
      />
    </View>
  )
}

NumberInput.options = {
  addGlobalClass: true
}

export default NumberInput
