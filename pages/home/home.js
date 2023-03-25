// pages/home/home.js
const { getStorage, setStorage } = require('../../utils/cache')
const { formatTime } = require('../../utils/util')
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    currentDate: "",
    region: [],
    recommendCardItems: [
      {
        header: 'recommendrecommendrecommendrecommendrecommend',
        content: 'contentcontentcontentcontentcontentcontentcontent',
        userId: '1',
        count: 999,
        date: '2023/03/20',
        art_id: 1
      }
    ],
    hotCardItems: []
  },

  requestAid(arr) {
    request('/area', 'POST', {
      area: arr.join('-')
    }).then((result) => {
      if (result === 'error') {
        wx.showModal({
          title: '提示',
          content: '当前区域暂无管理员'
        })
      } else {
        setStorage('aid', result.aid)
      }
      return arr
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    setStorage('area', this.data.region)
    this.requestAid(e.detail.value)
  },

  detailClick(e) {
    wx.navigateTo({
      url: '/pages/article/article?art_id=' + e.target.dataset.id
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
    const area = getStorage("area") ?? ["广东省", "汕头市", "潮阳区"]
    this.setData({
      userName: getStorage("user")?.name,
      region: area,
      currentDate: formatTime(new Date()).split(' ')[0]
    })
    this.requestAid(area)
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