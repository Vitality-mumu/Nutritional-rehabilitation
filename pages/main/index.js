// pages/main/index.js
import { loadFoodRecommend, loadElement } from "../../api/nutrition";
import { goLogin, needLogin } from "../../utils/util";
import { API_STATUS } from "../../consts/global";
const app = getApp();

Page({
  data: {
    tabbarActive: 0, // 底部tab index
    tabbarHeight: app.safeBottom + 50, // 底部tab高度
    tabbarList: [
      {
        title: "食材推荐",
        icon: {
          normal: "/assets/image/food@2x.png",
          active: "/assets/image/food-active@2x.png",
        },
      },
      {
        title: "元素评估",
        icon: {
          normal: "/assets/image/element@2x.png",
          active: "/assets/image/element-active@2x.png",
        },
      },
      {
        title: "报告结论",
        icon: {
          normal: "/assets/image/reports@2x.png",
          active: "/assets/image/reports-active@2x.png",
        },
      },
    ],
    foodRecommend: {},
    element: {},
    reportStatus: false,
  },
  onReady() {
    this.popup = this.selectComponent("#popup");
    this.report = this.selectComponent("#report");
  },
  onLoad(options) {
    const { tab = 0 } = options;
    const { loginState } = app.globalData.userInfo;
    if (loginState == 1) {
      this.getNutrition();
      this.loadElement();
    } else if (loginState == 0) {
      needLogin({
        backLocation: "/",
        forwardLocation: "/pages/main/index",
      });
    } else {
      goLogin(() => {
        if (app.globalData.userInfo.loginState) {
          this.getNutrition();
          this.loadElement();
        } else {
          needLogin({
            backLocation: "/",
            forwardLocation: "/pages/main/index",
          });
        }
      });
    }

    this.setData({
      tabbarActive: tab,
    });
  },
  // 朋友分享
  onShareAppMessage() {
    return {
      title: "万贝营养",
    };
  },
  // 朋友圈分享
  onShareTimeline() {
    return {
      title: "万贝营养",
    };
  },

  onPageScroll(e) {
    if (this.data.tabbarActive != 2) {
      return;
    }
    if (e.scrollTop >= 60) {
      this.setData({
        reportStatus: true,
      });
    } else {
      this.setData({
        reportStatus: false,
      });
    }
  },
  changeTab(event) {
    const self = this;
    const { detail } = event.detail;

    // 报告结论
    if (detail == 2) {
      this.report.clear();
      // 去本地缓存中拿用户信息，判读是否有身高体重（判断是否弹弹窗
      if (!app.globalData.userInfo.height || !app.globalData.userInfo.weight) {
        //1.没有，弹窗
        this.popup.openPopup();
      } else {
        // 2.有，不弹窗
        this.report.loadInfo(); //渲染数据
      }
    } else {
      // 关闭
      wx.setStorageSync("back", detail);
    }
    self.setData({
      tabbarActive: detail,
    });
  },
  // 弹窗关闭事件
  onClose(e) {
    if (e.detail) {
      // 已经填写完毕,调用子组件的请求，填写完毕
      this.report.loadInfo();
    } else {
      // 未填写，调回首页，不予查看
      let back = wx.getStorageSync("back");
      this.setData({
        tabbarActive: back,
      });
    }
  },

  async getNutrition() {
    try {
      const { code, data } = await loadFoodRecommend();
      if (code === API_STATUS.SUCCESS) {
        this.setData({
          foodRecommend: data || {}, // 所有营养数据
        });
        let food = data || {};
        let foodList = food.series;
        wx.setStorageSync("foodList", foodList);
      }
    } catch (ex) {
      console.log(ex);
    }
  },
  async loadElement() {
    try {
      const { code, data } = await loadElement();
      if (code === API_STATUS.SUCCESS) {
        this.setData({
          element: data || {}, // 所有元素
        });
        wx.setStorageSync("vitaminList", [
          ...data.vitamin.series,
          ...data.mineral.series,
        ]);
      }
    } catch (ex) {
      console.log(ex);
    }
  },
});
