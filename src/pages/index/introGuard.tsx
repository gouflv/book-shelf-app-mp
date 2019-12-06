import { observer } from '@tarojs/mobx'
import Taro, { useContext } from '@tarojs/taro'
import AppStore from '../../store/app'
import Index from './index'
import Intro from '../intro/index'

const Page: Taro.FC = () => {
  const { isUserBoundSite } = useContext(AppStore)
  return isUserBoundSite
    ? <Index />
    : <Intro />
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}

export default observer(Page)
