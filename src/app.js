import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import Index from './pages/index'
import globalData from './util/global.js'
import configStore from './store'

import './app.sass'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/index",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "热映"
      }, {
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/cate.png",
        selectedIconPath: "./assets/tab-bar/cate-active.png",
        text: "找片"
      }
      // , {
      //   pagePath: "pages/cart/cart",
      //   iconPath: "./assets/tab-bar/cart.png",
      //   selectedIconPath: "./assets/tab-bar/cart-active.png",
      //   text: "我的"
      // }
    ]
    }
  }

  componentDidMount () {
      const { userInfo } = globalData
      if (Object.keys(userInfo).length === 0) {
        Taro.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              Taro.getUserInfo({
                success: resS => {
                  // 可以将 res 发送给后台解码出 unionId
                  globalData.userInfo = resS.userInfo
                  Taro.switchTab({url: '/pages/index/index'})
                }
              })
            } else {
              Taro.switchTab({url: '/pages/home/index'})
            }
          }
         }).then()
      } else {
        Taro.switchTab({url: '/pages/index/index'})
      }
  }

  componentDidShow () {
  }

  componentDidHide () {}

  componentCatchError () {}

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
