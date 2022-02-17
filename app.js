import GoEasy from './utils/goeasy-2.2.2.min.js'
import {needLogin, subscribeMsg} from './utils/util'

App({
  subscribeMsg,
  needLogin,
  onLaunch() {
    const self = this;
    this.autoUpdate()

    const systemInfo = wx.getSystemInfoSync();
    // console.log('systemInfo', systemInfo)
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    self.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight + 6;
    self.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    self.globalData.menuHeight = menuButtonInfo.height;

    // 设置iphone底部安全距离 start
    const {safeArea, screenHeight} = systemInfo
    self.safeBottom = screenHeight - safeArea.top - safeArea.height
    // 设置iphone底部安全距离 end

    // goEasy start
    wx.goEasy = GoEasy.getInstance({
      host:'hangzhou.goeasy.io',//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
      appkey: 'BC-ef6d78afe6924f37ab5a60222947dc8d',// common key
      modules:["im"]
    });
    wx.GoEasy = GoEasy;
    // goEasy end
  },

  // 更新提示
  autoUpdate() {
    var self = this
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          self.downLoadAndUpdate(updateManager)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '新版本已上线，请删除当前小程序，重新搜索【万贝营养】呦~'
      })
    }
  },
  downLoadAndUpdate(updateManager) {
    wx.showLoading()
    // 更新成功
    updateManager.onUpdateReady(() => {
      wx.hideLoading()
      updateManager.applyUpdate()
    })
    // 更新失败
    updateManager.onUpdateFailed(() => {
      wx.hideLoading()
      wx.showModal({
        title: '已经有新版本喽~',
        content: '新版本已上线，请删除当前小程序，重新搜索【万贝营养】呦~'
      })
    })
  },
  globalData: {
    service: null,
    userInfo: wx.getStorageSync('userInfo') || {},
    wxUserInfo: wx.getStorageSync('wxUserInfo') || {},
    receiveAddress: wx.getStorageSync('address') || {}, // 收货地址
    navBarHeight: 0,
    menuBotton: 0,
    menuHeight: 0
  }
})
