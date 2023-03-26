const { getStorage } = require("../../utils/cache");
const { request } = require("../../utils/request");

// pages/emitFeedback/emitFeedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
  },

  feedbackInput(e) {
    this.setData({
      value: e.detail.value
    })
  },

  uploadClick() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res);
      }
    })
  },

  upload() {
    wx.uploadFile({
      url: '',
      filePath: '',
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        const data = res.data
        //do something
      }
    })
  },

  emitClick() {
    // todo 发送创建反馈请求
    request('/feedback', 'POST', {
      aid: getStorage('aid'),
      area_reply: "",
      content: this.data.value,
      state: 0,
      user_id: getStorage('user').user_id,
      user_reply: ""
    }).then(res => {
      wx.navigateBack()
    })
    // todo 调用upload
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