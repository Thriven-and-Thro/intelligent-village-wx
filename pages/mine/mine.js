// pages/mine/mine.js
const { getStorage, setStorage } = require('../../utils/cache')

Page({

  /**
   * 组件的初始数据
   */
  data: {
    avatar: '/static/icon/default_avatar.jpg',
    name: ''
  },

  onReady() {
    this.setData({
      name: getStorage('user').name,
      avatar: getStorage('user').avatar ?? '/static/icon/default_avatar.jpg'
    })
  }
})
