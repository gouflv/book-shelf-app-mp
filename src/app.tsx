import '@tarojs/async-await'
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
      // DEBUG

      //1
      'pages/intro/index', //引导
      'pages/site-map/index', //网点
      'pages/index/preview-only', //网点页
      'pages/book/index', //图书页
      'pages/book/comments/index', //评论
      //2
      'pages/buy-card/index', //购卡
      'pages/balance/index', //余额
      'pages/temp-cards/index', //次卡
      'pages/deposit/index', //押金
      'pages/buy-deposit/index', //押金支付
      //3
      'pages/profile/index', //个人
      'pages/order/index', //订单
      'pages/buy-book/index', //购书
      'pages/pay-overdue/index', //支付逾期

      'pages/index/index',
      'pages/wallet/index',
      'pages/user/index'
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
        { text: '钱包', pagePath: 'pages/wallet/index', iconPath: 'assets/tab_wallet_normal@3x.png', selectedIconPath: 'assets/tab_wallet_selected@3x.png' },
        { text: '我的', pagePath: 'pages/user/index', iconPath: 'assets/tab_me_normal@3x.png', selectedIconPath: 'assets/tab_me_selected@3x.png' },
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
