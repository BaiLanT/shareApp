// miniprogram/pages/user/user.js
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: '',
    avatarUrl: '',
    openId: '',
    isAdmin: false,
    length: 0
  },
  onLoad: function() {
    wx.hideShareMenu()
    const that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.saveuser(res)
            }
          })
        }
      }
    })
    const {
      openId
    } = this.data
    wx.cloud.callFunction({
      name: 'getusergift',
      success: function(res) {
        that.setData({
          length: res.result.length
        })
      }
    })
  },
  onGotUserInfo(e) {
    let {
      nickName,
      avatarUrl,
      gender
    } = e.detail.userInfo
    this.saveuser(e.detail)
    wx.setStorage({
      key: 'avatarUrl',
      data: avatarUrl
    })
    wx.setStorage({
      key: 'nickName',
      data: nickName
    })
  },
  navigator: function() {
    wx.navigateTo({
      url: '../start/start',
    })
  },
  // 保存用户信息
  saveuser: function(res) {
    const that = this
    wx.cloud.callFunction({
      name: 'saveuser',
      data: {
        res
      },
      success: function({
        result
      }) {
        if (result.openId == "otTRX4wIGUFlgRHekahAFKfRprdQ" || result.openId == 'otTRX49SpnjsWAifwqjZhRjyxQYg') {
          that.setData({
            isAdmin: true
          })
        }
        that.setData({
          nickName: result.userInfo.nickName,
          avatarUrl: result.userInfo.avatarUrl,
          openId: result.openId
        })
        wx.setStorage({
          key: 'uid',
          data: result.openId
        })
      }
    })
  },
  // 去参与页面
  gotoUserGifts: function() {
    wx.navigateTo({
      url: 'usergifts/usergifts',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideShareMenu()
    const that = this
    wx.cloud.callFunction({
      name: 'getusergift',
      success: function(res) {
        that.setData({
          length: res.result.length
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})