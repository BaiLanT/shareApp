// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    status: ""

  },
  card: function (e) {
    const info = JSON.stringify(e.target.dataset.item)
    wx.navigateTo({
      url: '../gift/gift?data=' + info,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.cloud.callFunction({
      name: 'gifts',
      success: function (res) {
        if (res.errMsg == 'cloud.callFunction:ok'){
          that.setData({
            list: res.result.data
          })
          that.gettime(res.result.data)
        }
      }
    })
  },
  
  gettime: function (day) {
    let status
    day.forEach(item => {
      const nowtime = Date.now()
      const daynum = Date.parse(item.date + ' ' + item.time)
      let downtime = nowtime + (daynum - nowtime)
      let stoptime = daynum - nowtime
      if (daynum - nowtime > 0) {
        status = '进行中～'
      } else {
        status = '已开奖'
      }
      item.countdown = {
        downtime,
        stoptime,
        status
      }
    })
    wx.cloud.callFunction({
      name: 'setgifts',
      data:{
        time: true,
        day
      }
    })
    this.setData({
      list: day,
      status
    })
  },

  myLinsterner(e) {
    this.setData({
      status: '结束'
    });
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
    const that = this
    wx.cloud.callFunction({
      name: 'gifts',
      success: function (res) {
        if (res.errMsg == 'cloud.callFunction:ok') {
          that.setData({
            list: res.result.data
          })
          that.gettime(res.result.data)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})