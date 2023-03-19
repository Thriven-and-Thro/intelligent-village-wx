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
    },
    rules: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(form) {
      // 校验
      // this.$refs.form
      //   .validate()
      //   .then((res) => {
      // this.loginRequest(form.detail.value.name, form.detail.value.password);
      wx.switchTab({
        url: '/pages/login/login'
      })
      //   })
      //   .catch((err) => {
      //     this.triggerEvent("openMessage", "error", err[0].errorMessage);
      //   });
    },

    modelValue(e) {
      if(e.target.dataset.key === 'name') {
        this.setData({
          'formData.name': e.detail.value
        })
      } else if(e.target.dataset.key === 'password'){
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
