import {register} from '../../api/user'
import {API_STATUS} from '../../consts/global'
const app = getApp()

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    title: '登录',
    backstatus: true,
    backLocation: '', // 取消登录跳转的地址
    forwardLocation: '', // 登录成功要跳转的地址

    name: '',
    idCard: '', // 身份证号
    MSG1: '请输入用户名',
    MSG2: '请输入身份证号',
    commonColor1: '#C8ACFC',
    commonColor2: '#C8ACFC',
    ERROR1: '',
    ERROR2: '',
    privacyChecked: false
  },
  onLoad: function (options) {
    const {backLocation = '', forwardLocation} = options
    this.setData({
      backstatus: decodeURIComponent(backLocation) !== '/' && decodeURIComponent(backLocation) !== '',
      backLocation: decodeURIComponent(backLocation),
      forwardLocation: decodeURIComponent(forwardLocation)
    })
  },
  togglePrivacyCheck() {
    const {privacyChecked} = this.data
    this.setData({privacyChecked: !privacyChecked})
  },
  onInputClick1(e) {
    this.setData({
      name: e.detail
    })
    if (e.detail.length == 0) {
      this.setData({
        ERROR1: '用户名不能为空'
      })
      return
    }

    const reg = /^[\u4e00-\u9fa5]{0,}$/;
    if (!reg.test(e.detail)) {
      this.setData({
        ERROR1: '请输入中文名称'
      })
    } else {
      this.setData({
        ERROR1: ''
      })
    }
    // console.log('用户名',this.data.ERROR1,this.data.ERROR2)

  },
  onInputClick2(e) {
    this.setData({
      idCard: e.detail
    })
    if (e.detail.length == 0) {
      this.setData({
        ERROR2: '身份证号不能为空'
      })
      return
    }

    const reg = /^[0-9]{15}([0-9]{2}x|[0-9]{2}X|[0-9]{3})?$/ // /^\d{15}|\d{18}$/;
    if(/\D/.test(e.detail) && (/[^X^x]$/.test(e.detail))) {
      this.setData({
        ERROR2: '身份证号码中不能包含除（X、x）以外的字母'
      })
      return
    }
    if (!reg.test(e.detail)) {
      this.setData({
        ERROR2: '身份证号输入格式错误'
      })
    } else {
      this.setData({
        ERROR2: ''
      })
    }
    // console.log('身份证', this.data.ERROR1,this.data.ERROR2)

  },

  // 登录注册
  async onPostClick(e) {
    const {userInfo} = app.globalData
    const {name, idCard, forwardLocation} = this.data
    const {encryptedData, iv} = e.detail

    try {
      const {code, data={}} = await register({
        name,
        idcard: idCard,
        encryptedData,
        iv
      });
      if (code == API_STATUS.SUCCESS) {
        const userInfoTemp = {
          ...userInfo,
          username: name,
          loginState: data.loginState
        }
        wx.setStorageSync('userInfo', userInfoTemp)
        app.globalData.userInfo = userInfoTemp

        wx.redirectTo({
          url: forwardLocation
        })
      }
    } catch (err) {}
  }
})