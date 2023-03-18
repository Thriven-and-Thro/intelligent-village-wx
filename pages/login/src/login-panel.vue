<template>
  <div class="login-panel">
    <uni-forms ref="form" :rules="rules" :model="formData">
      <uni-forms-item name="name">
        <uni-easyinput
          type="text"
          v-model="formData.name"
          prefixIcon="person"
          placeholder="请输入用户名"
        />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
          type="password"
          v-model="formData.password"
          prefixIcon="locked"
          placeholder="请输入密码"
        />
      </uni-forms-item>
    </uni-forms>
    <checkbox
      :checked="checked"
      @click="changeCheckBox"
      style="transform: scale(0.7)"
    />记住密码
    <button @click="loginClick">登录</button>
  </div>
</template>

<script>
import { setStorage, getStorage } from "../../../until/cache";
import { loginRules } from "../config/rules";
const app = getApp();

export default {
  name: "loginPanel",
  data() {
    return {
      formData: {
        name: "",
        password: "",
      },
      rules: loginRules,
      checked: false,
    };
  },
  methods: {
    // 发送请求
    loginRequest(name, password) {
      app.globalData
        .request("/login", "POST", {
          type: 2,
          name,
          password,
        })
        .then(
          (result) => {
            this.$emit("openMessage", "success", "登录成功");
            setStorage("user", {
              name: this.formData.name,
              password: this.formData.password,
              token: result.token,
            });
            setStorage("isChecked", this.checked);
          },
          (error) => {
            this.$emit("openMessage", "error", "用户名或密码错误");
          }
        );
    },
    // 登录
    loginClick(form) {
      // 校验
      this.$refs.form
        .validate()
        .then((res) => {
          this.loginRequest(this.formData.name, this.formData.password);
          uni.switchTab({
            url: "/pages/home/home",
          });
        })
        .catch((err) => {
          this.$emit("openMessage", "error", err[0].errorMessage);
        });
    },
    changeCheckBox() {
      this.checked = !this.checked;
    },
  },
  onReady() {
    if (getStorage("isChecked")) {
      this.checked = true;
      this.formData.name = getStorage("user").name;
      this.formData.password = getStorage("user").password;
    }
  },
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style scoped lang="scss">
.login-panel {
  font-size: 14px;
  /deep/ .uni-forms {
    .uni-forms-item {
      margin-bottom: 18px;
      .uni-forms-item__error {
        padding: 2px 30px;
      }
    }
    .uni-easyinput {
      .is-input-border {
        border-radius: 15px;
      }
    }
  }
  button {
    text-align: center;
    line-height: 30px;
    margin-top: 5px;
    background-image: linear-gradient(to right, #eae5c9, #6cc6cb);
    color: #fff;
  }
}
</style>
