// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '<p>aaa<img src="data:image/jpeg;base64,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" style="width: 300px;" data-filename="default_avatar.jpg"></p><p><br></p><table class="table table-bordered"><tbody><tr><td class="td"><br></td><td class="td"><br></td></tr><tr><td class="td"><br></td><td class="td"><br></td></tr><tr><td class="td"><br></td><td class="td"><br></td></tr></tbody></table><p><br></p>',
    date: '2023/03/21',
    user: {
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      avatar: '/static/icon/default_avatar.jpg'
    },
    commentItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // todo 请求文章
    // todo 请求评论
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