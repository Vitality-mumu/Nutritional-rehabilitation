/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2022-01-20 15:39:26
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-01-25 14:27:21
 */
// index.js
// 获取应用实例
const app = getApp();
import { loadReport } from "../../../../api/nutrition";
import { getWxUserInfo } from "../../../../utils/util";

Component({
  properties: {
    reportStatus: {
      type: Boolean,
    },
  },
  data: {
    report: null,
    status: false,
    userinfo: {},
  },
  observers: {
    reportStatus: function (params) {
      this.setData({
        status: params,
      });
    },
  },
  methods: {
    clear() {
      this.setData({
        report: null,
        status: false,
      });
    },
    loadInfo() {
      getWxUserInfo(() => {
        let userinfo = {
          name: wx.getStorageSync("userInfo").username,
          height: wx.getStorageSync("userInfo").height,
          weight: wx.getStorageSync("userInfo").weight,
          age: wx.getStorageSync("userInfo").age,
          gender: wx.getStorageSync("userInfo").gender,
          avatarUrl: wx.getStorageSync("wxUserInfo").avatarUrl,
        };
        this.setData(
          {
            userinfo,
          },
          () => {
            // 请求营养报告的信息
            this.loadReport();
          }
        );
      });
    },
    async loadReport() {
      try {
        let res = await loadReport();
        res.data.userFood = res.data.userFood.map((item) => {
          return {
            ...item,
            content: item.itemList.toString(),
          };
        });
        this.setData(
          {
            report: res.data,
          },
          () => {
            // 同步更新
            let userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo));
            userInfo.age = this.data.report.user.age;
            userInfo.gender =this.data.report.user.gender;
            app.globalData.userInfo = userInfo;
            wx.setStorageSync("userInfo", userInfo);
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
});
