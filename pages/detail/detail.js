// pages/detail/detail.js
const { getStorage } = require('../../utils/cache');
const { formateDate } = require('../../utils/formateDate');
const { request } = require('../../utils/request')

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
  onLoad: function (options) {
    // todo 请求数据
    request("/feedback/" + options.fee_id, "GET").then(res => {
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
        if (detail.state !== 0 && detail.user_reply.length === 0 && getStorage('user').name === res?.name) {
          display = true
        }

        this.setData({
          user: res,
          display
        })
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