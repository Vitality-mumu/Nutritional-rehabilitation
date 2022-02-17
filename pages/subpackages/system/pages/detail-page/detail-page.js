/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2022-01-19 09:11:44
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-01-25 10:54:54
 */
// logs.js

Page({
  data: {
    type: "",
    status: false,
    title: "",
    list: [],
    // 食材推荐
    foodList: {},
    // 维生素推荐
    vitaminList: {},
  },
  onLoad(option) {
    console.log(option.type);
    this.setData(
      {
        type: option.type,
        title: option.type == "food" ? "食材推荐" : " 维生素矿物质介绍",
      },
      () => {
        let list;
        if (option.type == "food") {
          list = wx.getStorageSync("foodList");
          list = list.map((item) => {
            item.content = item.list.toString();
            return {
              ...item,
            };
          });
        } else {
          list = wx.getStorageSync("vitaminList");
          console.log(list)
        }
        this.setData({
          list,
        });
      }
    );
  },
  onPageScroll(e) {
    if (e.scrollTop >= 60) {
      this.setData({
        status: true,
      });
    } else {
      this.setData({
        status: false,
      });
    }
  },
});
