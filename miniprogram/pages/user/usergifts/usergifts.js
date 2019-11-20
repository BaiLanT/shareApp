// miniprogram/pages/user/usergifts/usergifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    const that = this
    wx.cloud.callFunction({
      name: 'getusergift',
      success: function(res) {
        that.setData({
          list: res.result
        })
      }
    })
  },
  card: function(e) {
    const info = JSON.stringify(e.target.dataset.item)
    wx.navigateTo({
      url: '../../gift/gift?data=' + info,
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideShareMenu()
  }
})