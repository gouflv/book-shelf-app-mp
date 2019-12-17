import './index.scss'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import classNames from 'classnames'
import { CateType } from '../../config'

interface CateTabsProps {
  value: number | null
  onChange: (value: number | null) => void
}

const CateTabs: Taro.FC<CateTabsProps> = props => {
  return (
    <ScrollView scrollX>
      <View className='type-filter'>
        <View
          className={classNames('type-filter__item', { 'type-filter__item--active': !props.value })}
          onClick={() => props.onChange(null)}
        >全部</View>

        {CateType.map(cate => (
          <View
            key={cate.id}
            className={classNames('type-filter__item', { 'type-filter__item--active': props.value === cate.id })}
            onClick={() => props.onChange(cate.id)}
          >{cate.name}</View>
        ))}
      </View>
    </ScrollView>
  )
}

CateTabs.options = {
  addGlobalClass: true
}

export default CateTabs
