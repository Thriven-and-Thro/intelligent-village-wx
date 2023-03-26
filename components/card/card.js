// components/card/card.js
const { formateDate } = require('../../utils/formateDate')
const { request } = require('../../utils/request')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
      value: {
        title: '',
        content: '',
        updateTime: '',
        art_id: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: '',
    count: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  observers: {
    cardData(val) {
      request('/search', 'POST', {
        table: "comment",
        record: {
        },
        art_id: val.art_id
      }).then((res) => {
        if (res[0]) {
          this.setData({
            count: res[0].count,
            date: formateDate(val.updateTime)
          })
        }
      })
    }
  },
})
