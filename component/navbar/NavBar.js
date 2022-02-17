const app = getApp()
Component({
  properties: {
    //是否带返回键
    showBack: {
      type: Boolean,
      value: false
    },
    // 标题
    pageName: String,
    // 返回地址
    backLocation: String,
    backgroundColor:{
      type:String,
      value:''
    },
    color:{
      type:String,
      value:''
    }

  },
  data: {
    navBarHeight: app.globalData.navBarHeight
    // menuBotton: app.globalData.menuBotton,
    // menuHeight: app.globalData.menuHeight,
  },
  attached: function () {
  },

  methods:{
    onBackClick() {
      const {backLocation} = this.data
      console.log('backLocation', backLocation)
      if (backLocation) {
        wx.redirectTo({
          url: backLocation
        })
      } else {
        wx.navigateBack({
          fail(){
            wx.reLaunch({
              url: '/pages/main/index'
            })
          }
        })
      }
      // if (this.data.pageName == '登录') {
      //   wx.switchTab({
      //     url: '/pages/my-report/index',
      //   })
      // } else {
      //   wx.navigateBack();
      // }
    }
  }
})