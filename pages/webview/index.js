// pages/webview/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('webview', options)
    const {
      src,
      navBgColor = '#0A2962', // 顶部导航栏背景，仅支持16进制颜色值
      navColor = '#000000' // 顶部导航栏文案颜色，仅支持#000000、#ffffff
    } = options
    if (!wx.canIUse("web-view")) {
      console.log("当前微信版本不支持,请升级微信版本");
      return;
    }
    if (src) {
      this.setData({
        src: decodeURIComponent(src)
      });
    }
    !!navBgColor && wx.setNavigationBarColor({
      backgroundColor: navBgColor,
      frontColor: navColor
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})