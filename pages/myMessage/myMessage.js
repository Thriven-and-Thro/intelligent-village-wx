// pages/myMessage/myMessage.js
const { getStorage, removeStorage } = require('../../utils/cache')
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      password: '',
      phone: '',
      mail: ''
    }
  },

  modelValue(e) {
    if (e.target.dataset.key === 'phone') {
      this.setData({
        'formData.phone': e.detail.value
      })
    } else if (e.target.dataset.key === 'password') {
      this.setData({
        'formData.password': e.detail.value
      })
    } else {
      this.setData({
        'formData.mail': e.detail.value
      })
    }
  },

  formSubmit(form) {
    const user_id = getStorage('user').user_id
    const { phone, password, mail } = this.data.formData

    request("/user/" + user_id, "POST", {
      phone, password, mail
    })

    removeStorage('user')
    removeStorage('isChecked')

    // 跳转登录页
    wx.reLaunch({
      url: '/pages/login/login'
    })
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
    // todo 请求原数据
    const { password, phone, mail } = getStorage('user')
    this.setData({
      formData: {
        password,
        phone,
        mail
      }
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