// pages/feedback/feedback.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    cardData: [{
      content: "contentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
      userId: '1',
      state: 2,
      date: '20223/03/20',
      fee_id: '0'
    }]
  },
  feedbackClick(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?fee_id=' + e.target.dataset.id
    })
  }
})
