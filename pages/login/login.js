// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    status: 0,
    type: ""
  },
  loginClick: function () {
    this.setData({
      status: 1
    })
  },
  registerClick: function () {
    this.setData({
      status: 2
    })
  },
  returnClick: function () {
    this.setData({
      status: 0
    })
  }
})
