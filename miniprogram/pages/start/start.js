// miniprogram/pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    time: "",
    name: '',
    num: 0,
    remarks: ''
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
  formInputChange (e) {
    this.setData({
      name: e.detail.value
    })
  },
  formNumChange(e) {
    this.setData({
      num: e.detail.value
    })
  },
  formRemarksChange () {
    this.setData({
      remarks: e.detail.value
    })
  },
  // 发起助力
  start: function () {
    const { date, time, name, num, remarks} = this.data
    if (!name && !num){
      wx.showToast({
        title: '请正确填写内容',
        icon: 'none'
      })
      return
    }
    const now = this.formatDate(Date.now(), true)
    if (time == now){
      wx.showToast({
        title: '开奖时间需大于现在时间',
        icon: 'none'
      })
      return
    }
    const uid = wx.getStorageSync('uid')
    let info = {
      date,
      time,
      name,
      num,
      uid,
      remarks
    }
    wx.cloud.callFunction({
      name: 'savegift',
      data: {
        info
      },
      success: function (res) {
        if (res.errMsg == "cloud.callFunction:ok"){
          wx.showToast({
            title: '发起成功',
            icon: 'success',
            duration: 1000
          }),
          setTimeout(() => {
            wx.hideToast()
            wx.switchTab({
              url: '../index/index'
            })
          },1000)
        }
      }
    })
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