import { baseUrl } from '../env.config'
import {API_STATUS} from '../consts/global'

let requestCount = 0
function startLoading() {
  wx.showLoading({
    title: '加载中...',
    icon: 'none'
  })
}
function endLoading() {
  wx.hideLoading();
}
function needShowLoading() {
  if (requestCount === 0) {
    startLoading()
  }
  requestCount++
}
function needHideLoading() {
  if (requestCount <= 0) return
  requestCount--
  if (requestCount === 0) {
    endLoading()
  }
}

export const Request = (options) =>{
  const app = getApp()
  const {session} = app.globalData.userInfo
  const {
    baseUrlName = 'wanBeiApi',
    url = '',
    data = {},
    method = 'POST',
    responseType = ''
  } = options

  needShowLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl[baseUrlName] + url,
      data, method, responseType, timeout: 15000,
      header:{
        'content-type': 'application/json; charset=utf-8',
        'session': session
      },
      success (res) {
        if (res.statusCode === 200) {
          const { code } = res.data
          if(code === API_STATUS.SUCCESS) { // 成功
            resolve(res.data)
          } else if (code === API_STATUS.NEED_PARAM) { // 缺少参数
            wx.showToast({
              title: '缺少参数',
              icon: 'none'
            })
            resolve({code}) // 统一异常状态提示，走resolve逻辑
          } else { // 其他错误
            reject({code}) // 用于在catch中弹出某些自定义提示
          }
        } else {
          wx.showToast({
            title: '出错了，请稍后再试',
            icon: 'none'
          })
          resolve({code: res.statusCode}) // 统一异常状态提示，走resolve逻辑
        }
        needHideLoading()
      },
      fail (err) {
        wx.showToast({
          title: '网络开小差了',
          icon: 'none'
        })
        needHideLoading()
        resolve({code: API_STATUS.NET_ERR}) // 统一异常状态提示，走resolve逻辑
      }
    })
  })
};
