// promise的封装
const { getStorage }  = require("../utils/cache")

// const baseURL = "http://127.0.0.1:8000";
const baseURL = "http://43.139.137.2:50001";


const request =  (url, method, data, ...arr) => {
  const config = { url: baseURL + url, method, data, header:{}, ...arr};
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
  baseURL,
  request
}

