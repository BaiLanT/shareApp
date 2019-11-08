// miniprogram/pages/user/user.js
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: '',
    avatarUrl: '',
    appid: '',
    isAdmin: false
  },
  onLoad: function() {
    const that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              wx.cloud.callFunction({
                name: 'login',
                data: {
                  res
                },
                success: ({result}) => {
                  if (result.appid == 'wx50ca6457364e6428'){
                    that.setData({
                      isAdmin: true
                    })
                  }
                  that.setData({
                    nickName: result.userInfo.nickName,
                    avatarUrl: result.userInfo.avatarUrl,
                    appid: result.appid
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  onGotUserInfo(e) {
    let { nickName, avatarUrl, gender } = e.detail.userInfo
    this.setData({
      nickName,
      avatarUrl
    })
    wx.setStorage({
      key: 'avatarUrl',
      data: avatarUrl
    })
  },
  navigator: function () {
    wx.navigateTo({
      url: '../start/start',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})