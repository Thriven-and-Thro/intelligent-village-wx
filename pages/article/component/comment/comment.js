// pages/article/component/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type: String,
      value: ''
    },
    date: {
      type:String,
      value: ''
    },
    user: {
      type: Object,
      value: {
        name:'',
        avatar: '/static/icon/default_avatar.jpg'
      }
    },
    com_id: 0
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
