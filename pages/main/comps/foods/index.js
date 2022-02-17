import * as echarts from '../../../../component/ec-canvas/echarts'
import { foodOption } from './options'

const app = getApp()

Component({
  properties: {
    food: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (!newVal) return
        this.init_foodChart()
      }
    }
  },
  data: {
    themeVars: {
      buttonNormalFontSize: '18px'
    },
    backstatus: false,
    title: "食材推荐",
    navBarHeight: app.globalData.navBarHeight,
    foodCanvas: { // 食物占比canvas
      disableTouch: true,
      lazyLoad: true
    },
  },
  methods: {
    linkTo() {
      wx.navigateTo({
        url: `/pages/subpackages/system/pages/detail-page/detail-page?type=food`,
      });
    },
    // 初始化食物chart
    init_foodChart(type) {
      const self = this
      const {food} = this.data
      this.foodChartComponnet = this.selectComponent('#mychart-dom-pie');        //去获取echarts    这里的id就是echarts的id

      this.foodChartComponnet.init((canvas, width, height, dpr) => {
        const foodChart = echarts.init(canvas, null, {        //echarts会继承父元素的宽高
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        foodChart.setOption(foodOption({
          chartData: food
        })); //这一步是给echarts 设置数据及配置项
        return foodChart;
      });
    }
  }
})