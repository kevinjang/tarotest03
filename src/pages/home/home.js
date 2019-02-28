import Taro,{Component} from '@tarojs/taro'
// import {} from '@tarojs/taro-ui'
import {Swiper,SwiperItem, Image,View} from '@tarojs/components'
import { AtCard, AtBadge , AtIcon} from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.page = 1;
        this.state = {
            goods:[],
            top: []
        }
    }

componentDidMount(){
    global.getData('api/top').then(top=>{
        this.setState({
            top: top
        })

        console.log('this.state.top',this.state.top)
    }).catch(err=>{
        console.log(err)
    })
    // global.getData('api/goods').then(courses=>{
    //     console.log(courses)
    // })
    this.getGoods()
}

getGoods(){
    global.getData('api/goods?page='+this.page).then(goods=>{
        console.log('goods',goods)
        this.setState({
            goods
        })
    })
}

    render(){
        return <View>
            <Swiper
                className="swiper-container"
                interval={3000}
                circular
                autoplay
                indicatorDots
                indicatorActiveColor="red">
                {this.state.top.map(t=>{
                    return <SwiperItem key={t.id}>
                        <Image className="swiper-img" mode="aspectFit" src={`${global.url}courses/${t.img}`}></Image>
                    </SwiperItem>
                })}
            </Swiper>
            <View style="margin-top:15px;"></View>
            
            {this.state.goods.map(item=>{
                const thumb = item.sold>200?global.url+ 'fire.png':'';
                return <AtCard key={item.id}
                    title={item.name} 
                    note='课程简介'
                    thumb={thumb}
                    extra={`￥${item.price}`}>
                    课程详情 {item.sold}
                    
                    <View className="at-row">
                        <View className="at-col-4">
                            <Image mode="aspectFit" className="card-img" src={global.url+'courses/'+item.img}></Image>
                        </View>
                        <View className="at-col-7">
                            <View>已有{item.sold}人购买</View>
                            <View>
                                
                            <AtBadge value={item.tag}></AtBadge>
                            </View>
                        </View>
                        <View className="at-col-1">
                            <AtIcon value='add' size='30' color='steelblue'>
                            </AtIcon>
                        </View>
                    </View>
                    
                    
                    </AtCard>
            })}
        </View>
    }
}