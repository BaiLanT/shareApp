// miniprogram/pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    time: "",
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 日期时间转换
  formatDate: function (date, showSecond) {
    if (!date) return ''
    var d = new Date()
    if ((date + '').length === 10) d.setTime(date * 1000)
    else d.setTime(date)
    var year = d.getFullYear()
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    if (showSecond) return  hour + ':' + min
    return year + '-' + month + '-' + day // 按照此种格式显示日期
  },
  // 发起助力
  start: function () {
    const {date, time} = this.data
    console.log(date, time)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = Date.now()
    this.setData({
      date: this.formatDate(time),
      time: this.formatDate(time, true)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})