/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2022-01-21 09:23:56
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-01-23 16:23:36
 */
// pages/main/comps/report/Popup.js
const app = getApp();
import { sendUserInfo } from "../../../../api/nutrition";
Component({
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    height: "",
    weight: "",
    popupStatus: false,
  },

  attached() {},
  /**
   * 组件的方法列表
   */
  methods: {
    openPopup() {
      this.setData({
        popupStatus: true,
      });
    },
    onCloseClick() {
      this.closePopup(false);
    },
    closePopup(status) {
      this.setData({
        popupStatus: false,
      });
      this.triggerEvent("close", status);
    },
    onHeightClick(e) {
      this.setData({
        height: e.detail.value,
      });
    },
    onWeightClick(e) {
      this.setData({
        weight: e.detail.value,
      });
    },
    onConfirmClick() {
      if (this.data.weight == "" || this.data.height == "") {
        wx.showToast({
          title: "所填不能为空",
          icon: "none",
        });
      } else {
        // 发送请求
        this.sendUserInfo();
      }
    },
    async sendUserInfo() {
      try {
        let res = await sendUserInfo({
          height: this.data.height,
          weight: this.data.weight,
        });
        if(res.msg=='ok'){
        // 更新userInfo
        let userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo));
        userInfo.height = this.data.height;
        userInfo.weight = this.data.weight;
        app.globalData.userInfo = userInfo;
        wx.setStorageSync("userInfo", userInfo);
        // 关闭弹窗
        this.closePopup(true);
        }
       
      } catch (e) {
        console.log(e);
      }
    },
  },
});
