/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2022-01-12 14:22:13
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-01-19 10:22:49
 */
const app = getApp();
Component({
  properties: {
    backgroundColor:{
      type:String,
      value:'rgba(0,0,0,0)'
    },
    radius:{
      type:String,
      value:'false'
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    tabbarHeight: app.safeBottom
  },
  methods: {},
});
