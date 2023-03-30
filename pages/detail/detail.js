// pages/detail/detail.js
const { getStorage } = require('../../utils/cache');
const { formateDate } = require('../../utils/formateDate');
const { request, baseURL } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      fee_id: 0,
      content: "",
      user_id: 0,
      aid: 0,
      updateTime: "",
      state: 0,
      area_reply: "",
      user_reply: ""
    },
    date: '',
    user: {},
    textByState: '',
    display: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  updateFeedback(fee_id) {
    request("/feedback/" + fee_id, "GET").then(res => {
      const detail = res

      // 处理标签
      let textByState = "待处理"
      if (detail.state === 1) {
        textByState = '已处理'
      } else if (detail.state === 2) {
        textByState = '已拒绝'
      }

      this.setData({
        detail,
        textByState,
        date: formateDate(detail.updateTime)
      })

      request("/user/" + detail.user_id, "GET").then((res) => {
        // 处理发表输入框
        let display = false
        if (detail.state !== 0 && detail.user_reply?.length === 0 && getStorage('user').name === res?.name) {
          display = true
        }

        res.avatar = `${baseURL}/${res.avatar}-sm.jpg`
        this.setData({
          user: res,
          display
        })
      })
    })
  },

  emitClick(e) {
    request('/feedback/' + this.data.detail.fee_id, 'POST', {
      content: this.data.detail.content,
      state: this.data.detail.state,
      area_reply: this.data.detail.area_reply,
      user_reply: e.detail
    }).then((res) => {
      this.updateFeedback(this.data.detail.fee_id)
    })
  },

  onLoad: function (options) {
    this.updateFeedback(options.fee_id)
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

    Promise.all([
      this.updateFeedback(this.data.detail.fee_id)]).then(res => {
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