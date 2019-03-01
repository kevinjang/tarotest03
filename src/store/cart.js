import Taro from '@tarojs/taro'
import {observable, computed, autorun} from '@tarojs/mobx'

// computed计算属性
// autorun 类似watch

const cartStore = observable({
    carts: Taro.getStorageSync('cartData') || [],
    totalPrice: 0,
    addCart(item){
        const itemIncart = this.carts.findIndex(v=>v.id === item.id);
        if(itemIncart> -1){
            this.carts[itemIncart].count += 1;
        }else{
            item.count = 1
            this.carts.push(item)
        }

        Taro.showToast({
            title: '添加成功',
            duration: 2000
        })
    },
    cartSub(index){
        const count = this.carts[index].count - 1
        if(count > 1){
            // count-=1;
            this.carts[index] = {...this.carts[index], count}
        }
        else 
            this.carts.splice(index,1);
    },
    cartAdd(index){
        const newCount = this.carts[index].count + 1
        this.carts[index] = {...this.carts[index],count: newCount}
    }
})

const totalCount = computed(()=> cartStore.carts.reduce((sum,a)=>sum+a.count,0))

const totalPrice = computed(()=> cartStore.carts.reduce((sum,a)=>sum+a.count*a.price,0))

autorun(()=>{
    // 每次改动都会执行这个方法
    Taro.setTabBarBadge({
        index: 1,
        text: totalCount + ''
    })
    cartStore.totalPrice = totalPrice.get()
    Taro.setStorageSync('cartData', cartStore.carts.toJSON());
})
export default cartStore