// pages/mine/mine.js
const { getStorage, setStorage } = require('../../utils/cache')
const { baseURL, request } = require('../../utils/request')

Page({

  /**
   * 组件的初始数据
   */
  data: {
    avatar: '',
    name: '',
    cards: [{
      title: "我的反馈",
      url: ""
    }, {
      title: "我的评论",
      url: ""
    }, {
      title: "个人信息",
      url: ""
    }]
  },

  onReady() {
    return request('/user/' + getStorage('user').user_id, 'GET').then(res => {
      setStorage('user', {
        ...getStorage('user'),
        avatar: res.avatar
      })
      this.setData({
        name: res.name,
        avatar: `${baseURL}/${res.avatar}`
      })
    })
  },

  exitClick() {
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },

  goMineClick(e) {
    let url = ''
    if (e.target.dataset.index === 0) {
      url = '/pages/myFeedback/myFeedback'
    } else if (e.target.dataset.index === 1) {
      url = '/pages/myComment/myComment'
    } else {
      url = '/pages/myMessage/myMessage'
    }
    wx.navigateTo({
      url
    })
  },

  uploadImg() {
    const that = this

    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        wx.uploadFile({
          url: `${baseURL}/user/${getStorage('user').user_id}/img`,
          method: 'POST',
          header: {
            "content-type": "multipart/form-data",
            Authorization: 'Bearer ' + getStorage('user').token
          },
          filePath: tempFilePath,
          name: 'avatar',
          // 成功回调
          success(res) {
            that.onReady()
          }
        })
      }
    })
  },
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
})
