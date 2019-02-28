import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'
import todoStore from './store/todo'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  todoStore
}

global.url = 'http://localhost:3000/';
global.getData = (url)=>{
  return Taro.request({
    url: global.url+url
  }).then(res=>{
    if(res.statusCode == 200 && res.data.code == 0){
      return res.data.data
    }else{
      Taro.showToast({
        title:'出错了',
        duration:2000
      })
    }
  })
}

class App extends Component {

  config = {
    pages: [
      // 'pages/index/index'
      'pages/home/home',
      'pages/cart/cart',
      'pages/user/user'

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar:{
      selectedColor:"#b4422d",
      list:[
        {
          pagePath:'pages/home/home',
          iconPath:'./assets/home.png',
          selectedIconPath:'./assets/home-active.png',
          text:"首页"
        },
        {
          pagePath:'pages/cart/cart',
          iconPath:'./assets/cart.png',
          selectedIconPath:'./assets/cart-active.png',
          text:"购物车"
        },
        {
          pagePath:'pages/user/user',
          iconPath:'./assets/user.png',
          selectedIconPath:'./assets/user-active.png',
          text:"个人页"
        }
      ]
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
