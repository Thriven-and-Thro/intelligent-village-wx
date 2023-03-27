// components/deliver/deliver.js
const { getStorage } = require('../../utils/cache')
const { request } = require('../../utils/request')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    input: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    modelComment(e) {
      this.setData({
        input: e.detail.value
      })
    },

    emitClick() {
      this.triggerEvent('update', this.data.input)
      this.setData({
        input: ''
      })
    }
  }
})
