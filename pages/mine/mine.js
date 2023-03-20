// pages/mine/mine.js
const { getStorage, removeStorage } = require('../../utils/cache')

Page({

  /**
   * 组件的初始数据
   */
  data: {
    avatar: '/static/icon/default_avatar.jpg',
    name: '',
    cards: [{
      title: "我的反馈",
      url: ""
    }, {
      title: "我的评论",
      url: ""
    }, {
      title: "个人信息",
      url: ""
    }]
  },

  onReady() {
    this.setData({
      name: getStorage('user').name,
      avatar: getStorage('user').avatar ?? '/static/icon/default_avatar.jpg'
    })
  },

  exitClick() {
    removeStorage("user")
    removeStorage("isChecked")
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }
})
