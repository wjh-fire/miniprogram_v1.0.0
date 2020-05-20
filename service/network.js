import {
  baseUrl
} from './config.js'

export default function(options){
  if (options.token){
    options.url = '/' + options.url + '/' + options.token
  }
  console.log(baseUrl+ options.url)
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success:resolve,
      fail: reject
    })
  })
}