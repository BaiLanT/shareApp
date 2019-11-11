// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
        }
      }
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
    const that = this
    wx.cloud.callFunction({
      name: 'gifts',
      success: function (res) {
        if (res.errMsg == 'cloud.callFunction:ok') {
          that.setData({
            list: res.result.data
          })
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})