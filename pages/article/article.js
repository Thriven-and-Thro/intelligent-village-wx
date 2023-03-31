// pages/article/article.js
const { getStorage } = require('../../utils/cache')
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
    art_id: '',
    offset: 0,
    loading: false,
    count: 0
  },

  updateComments() {
    request('/search', 'POST', {
      table: "comment",
      record: {
      },
      art_id: this.data.art_id,
      offset: this.data.offset,
      limit: 10,
      desc: true
    }).then((res) => {
      if (res[0]) {
        const { count, data } = res[0]
        for (let i = this.data.commentItems.length - 1; i >= 0; i--) {
          data.unshift(this.data.commentItems[i])
        }
        
        this.setData({
          count,
          commentItems: data
        })
      }
    })
  },

  emitClick(e) {
    const { user_id } = getStorage('user')
    request('/comment', 'POST', {
      content: e.detail,
      user_id,
      art_id: this.data.art_id
    }).then((res) => {
      this.setData({
        commentItems: [],
        offset: 0
      })
      this.updateComments()
    })
  },

  requestArticle() {
    request('/article/' + this.data.art_id, 'GET').then((res) => {
      if (res[0]) {
        this.setData({
          title: res[0].title,
          content: res[0].content,
          date: formateDate(res[0].updateTime)
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

    this.requestArticle()

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
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    this.setData({
      offset: 0,
      commentItems: []
    })

    Promise.all([this.requestArticle(), this.updateComments()]).then(res => {
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
    if (this.data.loading || this.data.count === this.data.commentItems.length) return
    this.setData({
      offset: this.data.offset + 10,
      loading: false
    })
    this.updateComments()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})