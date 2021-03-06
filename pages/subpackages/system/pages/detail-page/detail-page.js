/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2022-01-19 09:11:44
 * @LastEditors: ππ½πππΎπΈ.
 * @LastEditTime: 2022-01-25 10:54:54
 */
// logs.js

Page({
  data: {
    type: "",
    status: false,
    title: "",
    list: [],
    // ι£ζζ¨θ
    foodList: {},
    // η»΄ηη΄ ζ¨θ
    vitaminList: {},
  },
  onLoad(option) {
    console.log(option.type);
    this.setData(
      {
        type: option.type,
        title: option.type == "food" ? "ι£ζζ¨θ" : " η»΄ηη΄ ηΏη©θ΄¨δ»η»",
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
