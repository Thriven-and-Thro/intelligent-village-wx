const setStorage = (key, data) => {
  wx.setStorageSync(key, JSON.stringify(data));
}

const getStorage = (key) => {
  const res = wx.getStorageSync(key);
  if (res) return JSON.parse(res);
}

const removeStorage = (key) => {
  wx.removeStorageSync(key)
}

module.exports = {
  setStorage, getStorage, removeStorage
}
