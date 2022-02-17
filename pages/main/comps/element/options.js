
export function vitaminOption(data) {
  const {name, type} = data
  const {
    achieve,
    series = []
  } = data.chartData
  const dataColor = {
    vitamin: ['#53E0D5', '#9689F4', '#7DE2AD', '#ED94FF', '#7FA5EF', '#FFBCA1', '#FF99B9'], // 维生素柱状图每个柱颜色
    mineral: ['#FC29BC', '#4AF4EB', '#FFB666', '#3E4CFF'] // 矿物质柱状图每个柱颜色
  }
  const xData = []
  const seriesData = []
  series.forEach((item, index) => {
    xData.push(item.name)
    seriesData.push({
      value: item.point,
      itemStyle: {
        color: dataColor[type][index]
      }
    })
  })
  const option = {
    title: {
      text: name,
      left: 'center',
      top: '0',
      textStyle: {
        color: '#000',
        fontSize: 21
      }
    },
    grid: {
      containLabel: true,
      top: 50,
      right: 40,
      bottom: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: { // x轴线
        show: true,
        lineStyle: {
          type: 'solid',
          color: '#636363'
        },
      },
      axisLabel: { // x轴刻度标签
        show: true,
        color: "#000",
        interval: 0,
        fontSize: 14,
        formatter: (val) => { // x轴label垂直展示
          return val.replace(' ', '').split('').join('\n')
        }
      },
      axisTick: { // x轴刻度
        show: false
      },
      data: xData,
      // show: false
    },
    yAxis: {
      // name: "mg",
      type: 'value', // 'category'
      max: 100,
      min: 0,
      // splitNumber: 4,
      // minInterval: 0.2,
      // interval: 0.5,
      splitLine: { // 网格样式
        show: false,
        interval: 100,
        // interval(index, value) { // 网格间隔数
        //   if (value % 10 == 0) {
        //     // console.log(index, value)
        //     return index
        //   }
        // },
        lineStyle:{
          color: ['#FF52EB'],//["#7CD98E", "#A6B566", "#BEA460", "#AA694C", "#933838"],// ['#0A1A47'],
          width: 0.75,
          type: 'dashed',
          opacity: 1
        }
      },
      axisLine: { // y轴线
        show: true,
        lineStyle: {
          type: 'solid',
          color: '#636363'
        },
      },
      axisLabel: { // 刻度标签
        show: true,
        color: "#000",
      },
    },
    series: [{
      name: 'A',
      type: 'bar',
      barWidth: '15px',
      lineStyle: {
        color: "#FFAE14",
        width: 2,
      },
      itemStyle: {
        normal: {
          // 静止时：
          color: "#FFAE14",
          barBorderRadius:[30, 30, 0, 0], // 柱子圆角
          label: {
            show: false, // 节点出现数值
            color: '#000'
          }
        },
        // emphasis: {
        //   // 鼠标经过时：
        //   color: "#000",
        // },
      },
      markLine: {
        symbolSize: 1,
        label: {
          show: true,
          position: 'end',
          formatter: '{b}',
          color:'#FF52EB'
        },
        lineStyle: {
          color: '#FF52EB'
        },
        data: [{yAxis: achieve, name: '达标'}]
      },
      data: seriesData
    }]
  };
  return option
}

