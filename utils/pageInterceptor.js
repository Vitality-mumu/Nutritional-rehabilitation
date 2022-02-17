import {goLogin} from './util'
const app = getApp()

// 获取url参数
function getQs(obj = {}) {
  let str = []
  for(let key in obj) {
    str.push(`${key}=${obj[key]}`)
  }
  return str.length > 0 ? '?'+str.join('&') : ''
}
// 不适用首页
export function pageInterceptor(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow
    pageObj.onShow = function() {
      const {session, loginState} = app.globalData.userInfo
      const pages = getCurrentPages()
      const targetPage = pages[pages.length - 1]
      const fromPage = pages[pages.length - 2] || {}
      const {route: targetRoute = '', options: targetRouteOptions} = targetPage // 当前页
      const {route: fromRoute = '', options: fromRouteOptions} = fromPage // 上一个页面

      if (!session) {
        goLogin(() => {
          _onShow.call(targetPage, targetRouteOptions)
        })
      } else if (loginState == 0 && targetRouteOptions.needRegister === 'true') {
        const backLocation = (fromRoute ? '/' : '') + fromRoute + getQs(fromRouteOptions)
        const forwardLocation = (targetRoute ? '/' : '') + targetRoute + getQs(targetRouteOptions)

        wx.navigateTo({
          url: '/pages/login/login?backLocation=' + encodeURIComponent(backLocation) + '&forwardLocation=' + encodeURIComponent(forwardLocation)
        })
      } else {
        _onShow.call(targetPage, targetRouteOptions)
      }
    }
  }
  return pageObj
}