export const loginRules = {
  // 对name字段进行必填验证
  name: {
    rules: [
      {
        required: true,
        errorMessage: "请输入用户名",
      },
    ],
  },
  // 对email字段进行必填验证
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码",
      },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "密码长度需在 {minLength} 到 {maxLength} 个字符之间",
      },
    ],
  },
};

export const registerRules = {
  // 对name字段进行必填验证
  name: {
    rules: [
      {
        required: true,
        errorMessage: "请输入用户名",
      },
    ],
  },
  // 对email字段进行必填验证
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入您的密码",
      },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: "密码长度需在 {minLength} 到 {maxLength} 个字符之间",
      },
    ],
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请再次输入您的密码",
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (data.password !== data.confirmPassword) {
            callback("两次输入的密码不一致");
          }
          return true;
        },
      },
    ],
  },
};
