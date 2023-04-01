// pages/myMessage/myMessage.js
const { getStorage, removeStorage, setStorage } = require('../../utils/cache')
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      password: '',
      confirmPassword: '',
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
    } else if (e.target.dataset.key === 'confirmPassword') {
      this.setData({
        'formData.confirmPassword': e.detail.value
      })
    } else {
      this.setData({
        'formData.mail': e.detail.value
      })
    }
  },

  formSubmit(form) {
    const { user_id, password } = getStorage('user')
    const formData = this.data.formData
    const len = formData.password.length

    if(len === 0) {
      wx.showModal({
        title: '错误',
        content: '必须输入密码'
      })

      return 
    }

    if (len < 6 || len > 20) {
      wx.showModal({
        title: '错误',
        content: '密码长度需在 6 到 20 个字符之间'
      })

      return
    }

    if(formData.password !== formData.confirmPassword) {
      wx.showModal({
        title: '错误',
        content: '两次输入的密码不一致'
      })
      return 
    }

    request("/user/" + user_id, "POST", {
      phone: formData.phone,
      password: formData.password,
      mail: formData.mail
    }).then(res => {
      if (formData.password !== password) {
        removeStorage('user')
        removeStorage('isChecked')

        // 跳转登录页
        wx.reLaunch({
          url: '/pages/login/login'
        })
      } else {
        setStorage('user', {
          ...getStorage('user'),
          phone: formData.phone,
          mail: formData.mail
        })

        wx.showModal({
          title: '提示',
          content: '修改成功'
        })
      }
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
        confirmPassword: password,
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
  onRefresh: function () {
    //导航条加载动画
    wx.showNavigationBarLoading();

    Promise.all([this.onReady()]).then(res => {
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