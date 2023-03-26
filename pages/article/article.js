// pages/article/article.js
const { formateDate } = require('../../utils/formateDate')
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    date: '',
    commentItems: [],
    art_id: ''
  },

  updateComments() {
    request('/search', 'POST', {
      table: "comment",
      record: {
      },
      art_id: this.data.art_id,
      offset: 0,
      limit: 1000
    }).then((res) => {
      if (res[0]) {
        this.setData({
          commentItems: res[0].data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      art_id: options.art_id
    })

    request('/article/' + options.art_id, 'GET').then((res) => {
      if (res[0]) {
        this.setData({
          title: res[0].title,
          content: res[0].content,
          date: formateDate(res[0].updateTime)
        })
      }
    })

    this.updateComments()
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