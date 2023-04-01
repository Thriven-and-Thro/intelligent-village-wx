// pages/article/component/comment.js
const { request, baseURL } = require('../../../../utils/request')
const { formateDate } = require('../../../../utils/formateDate')
const { getStorage } = require('../../../../utils/cache')

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
    user_id: {
      type: Number
    },
    com_id: {
      type: Number
    },
    floor: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    user: {
      name: '',
      avatar: ''
    },
    date: '',
    delete: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    deleteComment() {
      const that = this
      wx.showModal({
        title: '提示',
        content: '是否删除该条评论',
        success(res) {
          if (res.confirm) {
            request('/comment/' + that.data.com_id, 'DELETE').then(res => {
              that.triggerEvent('refreshComment')
            })
          }
        }
      })
    }
  },

  lifetimes: {
    ready() {
      if (this.properties.user_id === getStorage('user').user_id) {
        this.setData({
          delete: true
        })
      }

      request("/user/" + this.properties.user_id, "GET").then((res) => {
        res.avatar = `${baseURL}/${res.avatar}-sm.jpg`
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
