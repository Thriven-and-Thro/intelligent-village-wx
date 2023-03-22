// pages/detail/detail.js
const { getStorage } = require('../../utils/cache')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: 'hfjksdfhjksdfhksd',
    date: '2023/03/21',
    user: {
      name: 'a',
      avatar: '/static/icon/default_avatar.jpg'
    },
    state: 1,
    area_reply: 'ahdaskjdhasjkdh',
    user_reply: "",
    textByState: '待处理',
    display: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // todo 请求数据

    // 处理标签
    if (this.data.state === 1) {
      this.setData({
        textByState: '已处理'
      })
    } else if (this.data.state === 2) {
      this.setData({
        textByState: '已拒绝'
      })
    }

    // 处理发表输入框
    if (this.data.state !== 0 && this.data.user_reply.length === 0 && getStorage('user').name === this.data.user.name) {
      this.setData({
        display: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})