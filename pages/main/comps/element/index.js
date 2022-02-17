import * as echarts from '../../../../component/ec-canvas/echarts'
import { vitaminOption } from './options'

const app = getApp()

Component({
  properties: {
    vitamin: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (!newVal) return
        this.init_vitaChart()
      }
    },
    mineral: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (!newVal) return
        this.init_mineralChart()
      }
    }
  },
  data: {
    themeVars: {
      buttonNormalFontSize: '18px'
    },
    curTabId: 2,
    backstatus: false,
    title: "维生素矿物质评估",
    navBarHeight: app.globalData.navBarHeight,
    vitaCanvas: { // 食物占比canvas
      disableTouch: true,
      lazyLoad: true
    },
    mineralCanvas: { // 矿物质占比canvas
      disableTouch: true,
      lazyLoad: true
    },
  },

  methods: {
    linkTo() {
      wx.navigateTo({
        url: `/pages/subpackages/system/pages/detail-page/detail-page?type=vitamins`,
      });
    },
    // 初始化维生素chart
    init_vitaChart() {
      const self = this
      const { vitamin } = this.data
      this.vitaChartComponnet = this.selectComponent('#vitamin');        //去获取echarts    这里的id就是echarts的id
      this.vitaChartComponnet.init((canvas, width, height, dpr) => {
        const vitaChart = echarts.init(canvas, null, {        //echarts会继承父元素的宽高
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        vitaChart.setOption(vitaminOption({
          chartData: vitamin,
          name: '维生素评估',
          type: 'vitamin'
        })); //这一步是给echarts 设置数据及配置项
        return vitaChart;
      });
    },
    // 矿物质chart
    init_mineralChart() {
      const self = this
      const { mineral } = this.data
      this.mineralChartComponnet = this.selectComponent('#mineral');        //去获取echarts    这里的id就是echarts的id
      this.mineralChartComponnet.init((canvas, width, height, dpr) => {
        const mineralChart = echarts.init(canvas, null, {        //echarts会继承父元素的宽高
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        mineralChart.setOption(vitaminOption({
          chartData: mineral,
          name: '矿物质评估',
          type: 'mineral'
        })); //这一步是给echarts 设置数据及配置项
        return mineralChart;
      });
    }
  }
})