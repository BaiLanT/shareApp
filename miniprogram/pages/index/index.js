// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    once: true
  },
  card: function(e) {
    const info = JSON.stringify(e.target.dataset.item)
    wx.navigateTo({
      url: '../gift/gift?data=' + info,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'gifts',
      success: function(res) {
        if (res.errMsg == 'cloud.callFunction:ok') {
          that.setData({
            list: res.result.data
          })
        }
      }
    })
  },

  sopttime: function(e) {
    const index = e.target.dataset.index
    const {
      list
    } = this.data
    list[index].countdown.status = '结束'
    this.setData({
      list
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
    this.setData({
      once: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const that = this
    if (!this.data.once) {
      wx.cloud.callFunction({
        name: 'gifts',
        success: function(res) {
          if (res.errMsg == 'cloud.callFunction:ok') {
            that.setData({
              list: res.result.data
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      list: []
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})