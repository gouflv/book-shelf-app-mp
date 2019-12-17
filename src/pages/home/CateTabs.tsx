import './index.scss'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import classNames from 'classnames'

export type CateValue = number[] | null

interface CateTabsProps {
  value: CateValue
  onChange: (value: CateValue) => void
}

const CateTabs: Taro.FC<CateTabsProps> = props => {
  return (
    <ScrollView scrollX>
      <View className='type-filter'>
        <View
          className={classNames('type-filter__item', { 'type-filter__item--active': !props.value })}
          onClick={() => props.onChange(null)}
        >全部</View>
        <View
          className={classNames('type-filter__item', { 'type-filter__item--active': props.value })}
        >小班</View>
        <View className='type-filter__item'>中班</View>
        <View className='type-filter__item'>大班</View>
      </View>
    </ScrollView>
  )
}

CateTabs.options = {
  addGlobalClass: true
}

export default CateTabs
