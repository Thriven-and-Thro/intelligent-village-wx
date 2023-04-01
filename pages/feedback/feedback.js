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
    loading: false,
    count: 0
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
  requestData() {
    request("/search", "POST", {
      table: "feedback",
      record: {},
      aid: getStorage("aid"),
      offset: this.data.offset,
      limit: 10,
      desc: true
    }).then(res => {
      const { count, data } = res[0]
      for (let i = this.data.cardData.length-1; i >=0 ; i--) {
        data.unshift(this.data.cardData[i])
      }

      this.setData({
        count,
        cardData: data
      })
    })
  },
  onReady() {

  },
  onShow() {
    this.onRefresh()
  },
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    this.setData({
      offset: 0,
      cardData: []
    })

    Promise.all([this.requestData()]).then(res => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    this.onRefresh();
  },

  onReachBottom: function () {
    if (this.data.loading || this.data.count === this.data.cardData.length) return
    this.setData({
      offset: this.data.offset + 10,
      loading: false
    })
    this.requestData()
  }
})
