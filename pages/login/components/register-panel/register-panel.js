const { request } = require("../../../../utils/request")

// pages/login/components/register-panel/register-panel.js
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
    formData: {
      name: "",
      password: "",
      confirmPassword: ""
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(form) {
      // 校验
      const len = this.data.formData.password.length
      if (!this.data.formData.name.length) {
        wx.showModal({
          title: '错误',
          content: '必须输入用户名'
        })

        return
      }

      if (!len) {
        wx.showModal({
          title: '错误',
          content: '必须输入密码'
        })

        return
      }

      if (len < 6 || len > 20) {
        wx.showModal({
          title: '错误',
          content: '密码长度需在 6 到 20 个字符之间'
        })

        return
      }

      if (this.data.formData.password !== this.data.formData.confirmPassword) {
        wx.showModal({
          title: '错误',
          content: '两次输入的密码不一致'
        })

        return
      }

      request('/user', "POST", {
        name: this.data.formData.name,
        password: this.data.formData.password
      }).then(res => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      })
    },

    modelValue(e) {
      if (e.target.dataset.key === 'name') {
        this.setData({
          'formData.name': e.detail.value
        })
      } else if (e.target.dataset.key === 'password') {
        this.setData({
          'formData.password': e.detail.value
        })
      } else {
        this.setData({
          'formData.confirmPassword': e.detail.value
        })
      }
    }
  }
})
