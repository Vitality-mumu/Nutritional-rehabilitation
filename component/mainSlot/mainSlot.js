/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2022-01-12 14:22:13
 * @LastEditors: ππ½πππΎπΈ.
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
