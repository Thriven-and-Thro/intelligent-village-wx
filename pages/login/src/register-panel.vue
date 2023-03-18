<template>
  <div class="register-panel">
    <uni-forms ref="form" :model="formData">
      <uni-forms-item name="name">
        <uni-easyinput
          type="text"
          v-model="formData.name"
          prefixIcon="person"
          placeholder="请输入您的用户名"
        />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
          type="password"
          v-model="formData.password"
          prefixIcon="locked"
          placeholder="请输入您的密码"
        />
      </uni-forms-item>
      <uni-forms-item name="confirmPassword">
        <uni-easyinput
          type="password"
          v-model="formData.confirmPassword"
          prefixIcon="locked"
          placeholder="请再次输入密码"
        />
      </uni-forms-item>
    </uni-forms>
    <button @click="registerClick">注册</button>
  </div>
</template>

<script>
import { registerRules } from "../config/rules";

export default {
  name: "registerPanel",
  data() {
    return {
      formData: {
        name: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    this.$refs.form.setRules(registerRules);
  },
  methods: {
    registerClick(form) {
      this.$refs.form
        .validate()
        .then((res) => {
          this.$emit("openMessage", "success", "注册成功");
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
  },
  // 用于关闭默认样式隔离
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style scoped lang="scss">
.register-panel {
  /* 不能使用 :deep() */
  /deep/ .uni-forms {
    .uni-forms-item {
      margin-bottom: 10px;
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
    margin-top: 30px;
    background-image: linear-gradient(to right, #eae5c9, #6cc6cb);
    color: #fff;
  }
}
</style>
