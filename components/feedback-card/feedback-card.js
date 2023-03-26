const { request } = require("../../utils/request")
const { formateDate } = require("../../utils/formateDate")

// pages/feedback/feedback-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
      value: {
        content: '',
        user_id: '',
        state: 0,
        updateTime: '',
        fee_id: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    urlByState: '',
    date: '',
    user_name: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      let urlByState = '/static/icon/待处理.png'
      switch (this.properties.cardData.state) {
        case 1:
          urlByState = '/static/icon/已处理.png'
          break
        case 2:
          urlByState = '/static/icon/已拒绝.png'
          break
      }

      request("/user/" + this.properties.cardData.user_id, "GET").then((res) => {
        this.setData({
          user_name: res.name
        })
      })

      this.setData({
        urlByState: urlByState,
        date: formateDate(this.properties.cardData.updateTime),
      })
    }
  }
})
