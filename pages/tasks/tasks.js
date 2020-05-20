// pages/tasks/tasks.js
import request from '../../service/network.js'

const app =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  aaaaa(){
    // console.log(app.globalData.token)
    // app.ccc()
    const token = app.globalData.token
    request({
      url: 'user/all/' + token
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
})