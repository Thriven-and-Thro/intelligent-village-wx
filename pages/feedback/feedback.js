const { getStorage } = require("../../utils/cache")
const { request } = require("../../utils/request")

// pages/feedback/feedback.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    cardData: [],
    offset: 0,
    limit: 10
  },
  feedbackClick(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?fee_id=' + e.target.dataset.id
    })
  },
  emitClick() {
    wx.navigateTo({
      url: '/pages/emitFeedback/emitFeedback'
    })
  },
  onReady() {
    request("/search", "POST", {
      table: "feedback",
      record: {},
      aid: getStorage("aid"),
      offset: this.data.offset,
      limit: this.data.limit,
      desc: true
    }).then(res => {
      this.setData({
        cardData: res[0].data
      })
    })
  },
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    this.setData({
      offset: 0,
      limit: 10
    })

    Promise.all([this.onReady()]).then(res => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    this.onRefresh();
  },
})
