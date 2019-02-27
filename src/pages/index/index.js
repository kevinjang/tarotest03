import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

import {AtButton, AtInput, AtList, AtListItem} from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

@inject('todoStore')
@observer
export default class Index extends Component{
  config = {
    navigationBarTitleText:'Todolist'
  }
  constructor(props){
    super(props)
    this.state = {
      // todos:['吃饭','睡觉','开课吧小程序学习'],
      val:''
    }
  }

  inputHandle= (e) =>{
    if(e){
      this.setState({
        val: e
      })
    }

    // console.log('inputHandle',e)
    // Taro.showToast({
    //   title:e,
    //   // description:'hhhh',
    //   icon:'success',
    //   duration: 2000
    // })
  }

  handleClick = (e)=>{
    this.props.todoStore.addTodo(this.state.val)
    
    this.setState({
      // todos:[...this.state.todos,this.state.val],
      val:''
    })
  }

  handleChange = (i)=>{
    this.props.todoStore.removeTodo(i)
  }

  render(){
    const {todoStore} = this.props
    return (
      <View className='index'>
        <Text>开课吧Todolist</Text>
        <View className='at-icon at-icon-bullet-list'></View>
        <AtInput value={this.state.val} onChange={this.inputHandle} 
          placeholder='请输入内容' ></AtInput>
       
        <AtButton type="primary" onClick={this.handleClick}>Add</AtButton>
        
        <AtList>
          {todoStore.todos.map((item,i)=>{
            return <View>
              <AtListItem title={i+1+':'+ item}
                isSwitch onSwitchChange={()=>this.handleChange(i)}></AtListItem>
            </View>
          })} 
        </AtList>
        
        
      </View>
    )
  }
}
