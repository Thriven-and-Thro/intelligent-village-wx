// promise的封装
const { getStorage }  = require("../utils/cache")

const baseURL = "http://127.0.0.1:8000";

const request =  (url, method, data) => {
  const config = { url: baseURL + url, method, data, header: {} };
  const token = getStorage("user")?.token;
  if (token) config.header.Authorization = `Bearer ${token}`;

  // uni中加载中的api
  wx.showLoading({
    title: "加载中",
  });

  return new Promise((resolve, reject) => {
    wx.request({
      ...config,

      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        // uni中隐藏加载中的api
        wx.hideLoading();
      }
    });
  });
};

module.exports = {
  request
}

