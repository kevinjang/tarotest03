import Taro, { Component } from '@tarojs/taro'
// import {} from '@tarojs/taro-ui'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import { AtCard, AtBadge, AtIcon, AtLoadMore, AtDivider } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

import {observer, inject} from 'mobx'

@inject('cartStore')
@observer
export default class Cart extends Component{
    constructor(props){
        super(props)
    }

    config = {
        navigationBarTitleText:'购物车'
    }

    cartAdd = (index)=>{
        this.props.cartStore.cartAdd(index)
    }

    cartRemove = (index) => {
        this.props.cartStore.cartSub(index)
    }

    render(){
        const {cartStore} = this.props
        console.log('cartData', typeof Taro.getStorageSync('cartData'))
        return <View>{cartStore.carts.map((item,index)=>{
            // const thumb = item.sold > 200 ? global.url + 'fire.png' : '';
                return <View style={{ marginTop: '15px' }} key={item.id}>
                    <AtCard key={item.id}
                        title={item.name}
                        note='课程简介'
                        // thumb={thumb}
                        extra={`￥${item.price}`}>
                        
                        <View className="at-row">
                            <View className="at-col-4">
                                <Image mode="aspectFit" className="card-img" src={global.url + 'courses/' + item.img}></Image>
                            </View>
                            {/* <View className="at-col-8">
                                <View>
                                    <AtBadge value={item.tag}></AtBadge>
                                </View> 
                            </View>*/}
                            <View className="at-col-8">
                                <AtIcon value='subtract' size='30' color='red' onClick={()=>this.cartRemove(index)}></AtIcon>
                                <Text>{item.count}</Text>
                                <AtIcon value='add' size='30' color='steelblue' onClick={()=>this.cartAdd(index)}></AtIcon>
                            </View>
                        </View>


                    </AtCard>
                </View> 
        })}
        
        <AtButton type="primary">￥{cartStore.totalPrice}</AtButton>
        </View>
    }
}