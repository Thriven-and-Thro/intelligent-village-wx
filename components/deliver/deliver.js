// components/deliver/deliver.js
const { getStorage } = require('../../utils/cache')
const { request } = require('../../utils/request')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    art_id: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    comment: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    modelComment(e) {
      this.setData({
        comment: e.detail.value
      })
    },

    emitClick() {
      const { user_id } = getStorage('user')
      request('/comment', 'POST', {
        content: this.data.comment,
        user_id,
        art_id: this.properties.art_id
      }).then((res) => {
        this.setData({
          comment: ''
        })
        this.triggerEvent('updateComments')
      })


    }
  }
})
