// pages/article/component/comment.js
const { request } = require('../../../../utils/request')
const { formateDate } = require('../../../../utils/formateDate')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ''
    },
    updateTime: {
      type: String,
      value: ''
    },
    user_id: 0,
    com_id: 0
  },

  /**
   * 组件的初始数据
   */
  data: {
    user: {
      name: '',
      avatar: '/static/icon/default_avatar.jpg'
    },
    date: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    ready() {
      request("/user/" + this.data.user_id, "GET").then((res) => {
        this.setData({
          user: res
        })
      })
      this.setData({
        date: formateDate(this.properties.updateTime)
      })
    }
  }
})
