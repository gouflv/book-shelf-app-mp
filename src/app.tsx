import Taro, { Component, Config } from '@tarojs/taro'
import { onError, Provider } from '@tarojs/mobx'
import Index from './pages/index'

import AppStore from './store/app'

import './app.scss'

onError(error => {
  console.log('mobx global error listener:', error)
})

const store = {
  AppStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      //HOME
      'pages/intro/index',
      'pages/site-map/index',
      'pages/index/preview-only',

      'pages/index/index',
      'pages/book/index',

      'pages/wallet/wallet',
      'pages/user/user',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        { text: '借书', pagePath: 'pages/index/index', iconPath: 'assets/tab_books_normal@3x.png', selectedIconPath: 'assets/tab_books_selected@3x.png' },
        { text: '钱包', pagePath: 'pages/wallet/wallet', iconPath: 'assets/tab_wallet_normal@3x.png', selectedIconPath: 'assets/tab_wallet_selected@3x.png' },
        { text: '我的', pagePath: 'pages/user/user', iconPath: 'assets/tab_me_normal@3x.png', selectedIconPath: 'assets/tab_me_selected@3x.png' },
      ],
      color: '#929592',
      selectedColor: '#F1B400'
    },
    permission: {
      'scope.userLocation': {
        desc: '查找附近的借书馆'
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
