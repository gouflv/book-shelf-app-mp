import Taro, { useContext } from '@tarojs/taro'
import { View } from '@tarojs/components'
import DialogService from '../../store/dialogService'
import Dialog from '../Dialog'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'

const BasicPageView: Taro.FC<{ className?: string }> = props => {
  const { dialogVisible, dialogOptions } = useContext(DialogService)

  return (
    <View className={classNames('page', props.className )}>
      {props.children}

      {dialogOptions && (
        <Dialog
          isOpened={dialogVisible}
          closeOnClickOverlay={false}
          {...dialogOptions}
        />
      )}
    </View>
  )
}

BasicPageView.options = {
  addGlobalClass: true
}

export default observer(BasicPageView)
