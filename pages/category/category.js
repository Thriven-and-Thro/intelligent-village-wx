// pages/category/category.js
const { getStorage } = require('../../utils/cache')
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelArr: [
      "党务", "村务", "财务", "项目"
    ],
    state: 0,
    cardItems: [],
    offset: 0,
    limit: 10,
  },

  labelClick(e) {
    this.setData({
      state: e.target.dataset.index
    })
    this.requestCardItems()
  },

  requestCardItems() {
    request('/search', 'POST', {
      table: "article",
      record: {
      },
      aid: getStorage('aid'),
      offset: this.data.offset,
      limit: this.data.limit,
      type: this.data.state + 1
    }).then((res) => {
      if (res[0]) {
        this.setData({
          cardItems: res[0].data
        })
      }
    })
  },

  detailClick(e) {
    wx.navigateTo({
      url: '/pages/article/article?art_id=' + e.target.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestCardItems()
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