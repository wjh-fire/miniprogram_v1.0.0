//app.js
//app.js
import request from './service/network.js'
App({
  globalData: {
    token: ''
  },
  onLaunch(){
    const token = wx.getStorageSync('token')
    if(token && token.length !== 0){
      this.auth(token)
    }else{
      this.login();
    }
  },
  login(){
    wx.login({
      complete: (res) => {
        const code = res.code;
        // console.log(code);
        request({
          url: '/login',
          method: 'post',
          data: {
            code
          }
        }).then(res=>{
          const token = res.data.token
          this.globalData.token = token
          wx.setStorageSync('token', token)
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    })
  },
  auth(token){
    request({
      url: '/auth',
          method: 'post',
          data: {
            token
          }
    })
    .then((res)=>{
      console.log(res)
      if(!res.data.errCode){
        console.log('token有效')
        this.globalData.token = token
      }else{
        this.login()
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  ccc(){
    console.log('sssssssss')
  }
})