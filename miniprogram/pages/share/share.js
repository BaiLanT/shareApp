// miniprogram/pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshare: false,
    users: [],
    nickName: '',
    avatarUrl: '',
    stat: 0,
    uid: '',
    _id: ''
  },
  getuserinfo: function (e) {
    const { users, uid, stat, _id, nickName} = this.data
    wx.cloud.callFunction({
      name: 'getuid',
      data: {
        event: e
      }
    }).then(result => {
      if (result.result.openid == uid){
        wx.showToast({
          title: '不能给自己助力,请点击右上角菜单分享给朋友',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 1500)
        return
      }
      if (e.detail.userInfo.nickName == nickName){
        wx.showToast({
          title: '已经给他助力,无法再次操作',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 1500)
        return
      }
      const stats = Math.floor((Math.random() * 10) + 1)
      users.push({
        nickName: e.detail.userInfo.nickName,
        avatrUrl: e.detail.userInfo.avatarUrl,
        stat: stats
      })
      this.setData({
        users,
        stat: Number(stat) + Number(stats)
      })
      // 保存用户信息到数据库
      wx.cloud.callFunction({
        name: 'updatagifts',
        data: {
          users,
          share: true,
          _id: _id || ''
        },
        success: function (res) {
          // console.log(res)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.showShareMenu({
      withShareTicket: true
    })
    const {uid, _id, nickName, avatarUrl, stat} = options
    that.setData({
      nickName, avatarUrl, stat, uid, _id
    })
    wx.cloud.callFunction({
      name: 'getusergift',
      data:{
        uid,
        _id
      },
      success: function (res) {
        if (res.result.openid == uid){
          that.setData({
            isshare: true
          })
        }
        that.setData({
          users: res.result.users.users
        })
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
    wx.onAppShow((e) => {
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
    this.setData({
      isshare: false
    })
  }
})