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
    loading: false,
    count: 0
  },

  labelClick(e) {
    this.setData({
      state: e.target.dataset.index,
      cardItems: []
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
      limit: 10,
      type: this.data.state + 1
    }).then((res) => {
      if (res[0]) {
        const { count, data } = res[0]
        for (let i = this.data.cardItems.length-1; i >=0 ; i--) {
          data.unshift(this.data.cardItems[i])
        }

        this.setData({
          count,
          cardItems: data
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
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    this.setData({
      offset: 0,
      cardItems: []
    })

    Promise.all([this.onReady()]).then(res => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    this.onRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading || this.data.count === this.data.cardItems.length) return
    this.setData({
      offset: this.data.offset + 10,
      loading: false
    })
    this.onReady()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})