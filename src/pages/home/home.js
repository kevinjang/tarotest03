import Taro, { Component } from '@tarojs/taro'
// import {} from '@tarojs/taro-ui'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import { AtCard, AtBadge, AtIcon, AtLoadMore, AtDivider } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

import {observer, inject} from 'mobx'

@inject('cartStore')
@observer
export default class Home extends Component {
    config = {
        enablePullDownRefresh: true
    }

    constructor(props) {
        super(props)
        this.page = 1;
        this.state = {
            isH5:process.env.TARO_ENV === 'h5',
            goods: [],
            top: [],
            hasMore: true
        }
    }

    componentDidMount() {
        global.getData('api/top').then(top => {
            this.setState({
                top: top
            })

            // console.log('this.state.top',this.state.top)
        }).catch(err => {
            console.log(err)
        })
        // global.getData('api/goods').then(courses=>{
        //     console.log(courses)
        // })
        this.getGoods()
    }

    onPullDownRefresh() {
        console.log('哼哼哈嘿')
        this.getGoods(true);
    }

    onReachBottom(){
        console.log('触底反弹')
        this.loadMore();
    }

    loadMore= ()=>{
        this.page = this.page +1;
        this.getGoods(true)
    }

    getGoods(append) {
        global.getData('api/goods?page=' + this.page).then(goods => {
            // console.log('goods',goods)
            if(append){
                this.setState({
                    goods: [...this.state.goods,...goods]
                });
            }
            else{
                this.page = 1;
                this.setState({
                    goods
                })
            }
            console.log('goods.length',goods.length);
            this.setState({
                hasMore: goods.length === 6
            })

            console.log('load succeeded')
        })
    }

    addCart = (item)=>{
        console.log('加载购物车',this.props.cartStore)
        this.props.cartStore.addCart(item)
    }

    render() {
        return <View>
            <Swiper
                className="swiper-container"
                interval={3000}
                circular
                autoplay
                indicatorDots
                indicatorActiveColor="red">
                {this.state.top.map(t => {
                    return <SwiperItem key={t.id}>
                        <Image className="swiper-img" mode="aspectFit" src={`${global.url}courses/${t.img}`}></Image>
                    </SwiperItem>
                })}
            </Swiper>
            <View style="margin-top:15px;">

            {this.state.goods.map(item => {
                const thumb = item.sold > 200 ? global.url + 'fire.png' : '';
                return <View style={{ marginTop: '15px' }} key={item.id}>
                    <AtCard key={item.id}
                        title={item.name}
                        note='课程简介'
                        thumb={thumb}
                        extra={`￥${item.price}`}>
                        课程详情 {item.sold}

                        <View className="at-row">
                            <View className="at-col-4">
                                <Image mode="aspectFit" className="card-img" src={global.url + 'courses/' + item.img}></Image>
                            </View>
                            <View className="at-col-7">
                                <View>已有{item.sold}人购买</View>
                                <View>

                                    <AtBadge value={item.tag}></AtBadge>
                                </View>
                            </View>
                            <View className="at-col-1">
                                <AtIcon value='add' size='30' color='steelblue' onClick={()=>this.addCart(item)}>
                                </AtIcon>
                            </View>
                        </View>


                    </AtCard>
                </View>

            })}
            </View>

            {this.state.hasMore? <View>{this.state.isH5?<AtLoadMore onClick={()=>this.loadMore()}></AtLoadMore>:null}</View>: <AtDivider content="没有更多了"></AtDivider>}


            
        </View>
    }
}