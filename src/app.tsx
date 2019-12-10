import './app.scss'
import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { onError, Provider } from '@tarojs/mobx'
import Index from './pages/index'
import { store as app } from './store/app'

onError(error => {
  console.log('mobx error', error)
})

const store = {}

class App extends Component {

  config: Config = {
    pages: [
      'pages/boot/index',
      'pages/login/index',
      'pages/user-bind-phone/index',
      'pages/index/introGuard',
      'pages/wallet/index',
      'pages/user/index',

      //1
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
      'pages/profile-chpwd/index',
      //4
      'pages/order/index', //订单
      'pages/buy-book/index', //购书
      'pages/pay-overdue/index', //支付逾期
      //5
      'pages/help/index',
      'pages/feedback/return/index',
      'pages/feedback/payment/index',
      'pages/feedback/shelf/index',
      //6
      'pages/share/index',
      'pages/share-land/index',
      'pages/result/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '葫芦弟弟借书馆',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        { text: '借书', pagePath: 'pages/index/introGuard', iconPath: 'assets/tab_books_normal@2x.png', selectedIconPath: 'assets/tab_books_selected@2x.png' },
        { text: '钱包', pagePath: 'pages/wallet/index', iconPath: 'assets/tab_wallet_normal@2x.png', selectedIconPath: 'assets/tab_wallet_selected@2x.png' },
        { text: '我的', pagePath: 'pages/user/index', iconPath: 'assets/tab_me_normal@2x.png', selectedIconPath: 'assets/tab_me_selected@2x.png' },
      ],
      color: '#929592',
      selectedColor: '#F1B400'
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用查找附近的借书馆'
      }
    }
  }

  async componentWillMount() {
    const params = this.$router.params
    app.init(params)
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider value={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
