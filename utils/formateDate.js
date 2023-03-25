const formateDate = (updateTime = '') => {
  return updateTime.slice(0, 10).split('-').join('/')
}

module.exports = { formateDate }