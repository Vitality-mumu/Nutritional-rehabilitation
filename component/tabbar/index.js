Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbarActive: {
      type: Number,
      value: 0
    },
    tabbarList: {
      type: Array,
      value: []
    },
    newReport: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换tab
    _onChange(event) {
      this.triggerEvent('changeTab', event)
    }
  }
})
