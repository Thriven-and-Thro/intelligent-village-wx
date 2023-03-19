// pages/home/home.js
const { getStorage, setStorage } = require('../../utils/cache')
const { formatTime } = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    currentDate: "",
    region: []
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    setStorage('area', this.data.region)
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
    this.setData({
      userName: getStorage("user").name,
      region: getStorage("area") ?? [],
      currentDate: formatTime(new Date()).split(' ')[0]
    })
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