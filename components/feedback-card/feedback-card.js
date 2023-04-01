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
      let urlByState = '/static/icon/pedding.png'
      switch (this.properties.cardData.state) {
        case 1:
          urlByState = '/static/icon/resolve.png'
          break
        case 2:
          urlByState = '/static/icon/reject.png'
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
