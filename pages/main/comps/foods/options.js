// 食物种类占比图option
export function foodOption(data) {
  const {
    name = '', // tab名，用于chart图中间显示
    total = 0, // 总数，用于chart图中间显示
    series = []
  } = data.chartData
  const tempData = series.map(item => {
    return {
      value: item.count,
      icon: 'circle',
      name: `${item.name}（${item.count}种）`
    }
  })

  const option = {
    color: ['#FE8310', '#ED4AA4', '#FFC3C2', '#FFE161', '#30703F', '#9EE8A0', '#0AC1B8', '#FF9880', '#C67DFF', '#D9E8FF', '#4775EA'],
    title: {
      text: name + '食物\n' + total +'类',
      left: 'center',
      top: '26.5%',
      textStyle: {
        color: '#A279D7',
        fontSize: 18,
        align: 'center',
        lineHeight: 24
      }
    },
    legend: {
      icon: 'circle', // 图例圆形
      // width: '94%',
      top: '62%',
      left: '5%',
      right: '5%',
      itemGap: 16, // 图例标记上下间距
      itemWidth:20, // 图例标记宽度
      itemHeight: 20, // 图例标记高度
      // borderWidth: 10, // 整体图例标记宽度
      // borderRadius: 2, // 整体图例标记圆角
      // itemStyle: {
      //   borderColor: '#f00', // 图例border 颜色
      //   borderWidth: 10, // 图例border宽度
      //   borderRadius: 10 // 图例border圆角
      // },
      formatter: function(name) {
        return '{a|' + name + '}'
      },//['{name}'],
      textStyle: {
        color: '#000',
        rich: {
          a: {
            width: 60
            // color: '#00f',
            // backgroundColor: '#f00'
          }
        }
      }
    },
    series: [{
      label: {
        width: 200,
        normal: {
          position: 'inner',
          show: false,
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '31.6%'],
      radius: ['37%', '60%'],
      labelLine: {
        show: false
      },
      itemStyle: {
        // borderRadius: 6, // 圆环模块边框圆角
        // color: ['#FE8310', '#ED4AA4'],
        borderColor: '#fff', // 圆环模块边框颜色
        borderWidth: 1 // 圆环模块边框宽度
      },
      data: tempData
    }]
  };
  return option
}

