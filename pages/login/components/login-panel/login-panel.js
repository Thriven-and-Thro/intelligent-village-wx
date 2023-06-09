// login-panel.js
const { request } = require('../../../../utils/request')
const { getStorage, setStorage } = require('../../../../utils/cache')

Component({
  data: {
    formData: {
      name: "",
      password: "",
    },
    rules: "",
    checked: false,
  },
  methods: {
    // 发送请求
    loginRequest(name, password) {
      request("/login", "POST", {
        type: 2,
        name,
        password,
      })
        .then(
          (result) => {
            if (result.token) {
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              setStorage("user", {
                ...result,
                password: this.data.formData.password
              });
              setStorage("isChecked", this.data.checked);
              wx.switchTab({
                url: '/pages/home/home'
              })
            } else {
              wx.showToast({
                title: '用户名或密码错误',
                icon: 'error',
                duration: 2000
              })
            }
          }
        );
    },
    // 登录
    formSubmit(form) {
      this.loginRequest(form.detail.value.name, form.detail.value.password);
    },

    changeCheckBox() {
      this.setData({
        checked: !this.data.checked
      })
    },

    modelValue(e) {
      if (e.target.dataset.key === 'name') {
        this.setData({
          'formData.name': e.detail.value
        })
      } else {
        this.setData({
          'formData.password': e.detail.value
        })
      }
    }

  },

  lifetimes: {
    ready() {
      if (getStorage("isChecked")) {
        this.setData({
          checked: true,
          formData: {
            name: getStorage("user").name,
            password: getStorage("user").password
          }
        })
      }
    }
  }
})
