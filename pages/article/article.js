// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '<p>aaa</p><p><br></p><table class="table table-bordered"><tbody><tr><td class="td"><br></td><td class="td"><br></td></tr><tr><td class="td"><br></td><td class="td"><br></td></tr><tr><td class="td"><br></td><td class="td"><br></td></tr></tbody></table>',
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
    console.log(options);
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