// pages/myComment/myComment.js
const { getStorage } = require("../../utils/cache")
const { formateDate } = require("../../utils/formateDate")
const { request } = require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentItems: []
  },

  articleClick(e) {
    wx.navigateTo({
      url: '/pages/article/article?art_id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    return request('/user/comment/' + getStorage('user').user_id, 'GET').then(res => {
      res.map((v) => v.date = formateDate(v.updateTime))
      this.setData({
        commentItems: res
      })
    })
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
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    Promise.all([this.onLoad()]).then(res => {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})