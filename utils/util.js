import { login } from '../api/user'
import {API_STATUS} from '../consts/global'
// 登录
export function goLogin(cb) {
  const app = getApp()
  const {session} = app.globalData.userInfo
  if(!session) {
    wx.login({
      success(res) {
        if (res.code) {
          login({code: res.code}).then((loginRes) => {
            app.globalData.userInfo = loginRes.data || {}
            wx.setStorageSync('userInfo', loginRes.data)
            cb && cb()
          })
        }
      }
    })
  }
}

// check登录
export function needLogin(obj) {
  const {backLocation, forwardLocation} = obj
  const app = getApp()
  const {loginState} = app.globalData.userInfo

  if (!loginState) {
    wx.navigateTo({
      url: '/pages/login/login?backLocation=' + encodeURIComponent(backLocation) + '&forwardLocation=' + encodeURIComponent(forwardLocation)
    })
  }
}

export function subscribeMsg({success, fail, complete}) {
  wx.requestSubscribeMessage({
    tmplIds: ['quzgXHJygSKqp6siJon8QMpPW-r_e4Tlcgms9ibZPZs'],
    success(res) {
      console.log('订阅success', res)
      success && success()
    },
    fail(res) {
      console.log('订阅fail', res)
      fail && fail()
    },
    complete(res) {
      console.log('订阅complete', res)
      complete && complete()
    }
  })
}

// 获取微信用户头像、用户名
export function getWxUserInfo(cb) {
  const app = getApp()
  const {avatarUrl} = app.globalData.wxUserInfo
  if (!avatarUrl) {
    // 客服
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于信息展示',
      success(res) {
        const {userInfo} = res
        wx.setStorageSync('wxUserInfo', userInfo)
        app.globalData.wxUserInfo = userInfo
        cb && cb()
      },
      fail() {
        cb && cb()
      }
    })
  } else {
    cb && cb()
  }
}
