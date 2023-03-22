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
        userId: '',
        state: 0,
        date: '',
        fee_id: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    urlByState: '/static/icon/待处理.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      if(this.properties.cardData.state > 0) {
        let urlByState = '/static/icon/待处理.png'
        switch(this.properties.cardData.state) {
          case 1:
            urlByState = '/static/icon/已处理.png'
            break
          case 2:
            urlByState = '/static/icon/已拒绝.png'
            break
        }
        this.setData({
          urlByState: urlByState
        })
      }
    }
  }
})
