// miniprogram/pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    nickName: '',
    avatarUrl: '',
    isuser: true,
    users: [],
    stat: 5,
  },
  // 参与助力
  getuserinfo: function(e) {
    const {
      _id
    } = this.data.list
    const {
      users,
      usertitle,
      isshare,
      stat
    } = this.data
    // 获取当前用户UID
    wx.cloud.callFunction({
      name: 'getuid',
      data: {
        event: e
      }
    }).then(result => {
      // 判断当前用户用没有参与过
      const iscan = users.filter(item => {
        return item.uid == result.result.openid
      })
      if (iscan.length > 0) {
        wx.showToast({
          title: '您已经参与过助力,无法再次参与',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 1500)
        return false
      }
      let info = {
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        uid: result.result.openid,
        stat,
        users: []
      }
      users.unshift(info)
      this.setData({
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        users
      })
      // 保存用户信息到数据库
      wx.cloud.callFunction({
        name: 'updatagifts',
        data: {
          users,
          _id: _id
        },
        success: function(res) {
          wx.showToast({
            title: '参与成功~',
            mask: true
          })
          setTimeout(() => {
            wx.hideToast()
            wx.navigateTo({
              url: `../share/share?uid=${result.result.openid}&_id=${_id}&nickName=${e.detail.userInfo.nickName}&avatarUrl=${e.detail.userInfo.avatarUrl}&stat=${stat}`,
            })
          }, 1500)
        }
      })
    })
  },
  gotoinfo: function(e) {
    console.log(e)
    const {
      list
    } = this.data
    const {
      nickname,
      avatarurl,
      uid,
      stat
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../share/share?uid=${uid}&_id=${list._id}&nickName=${nickname}&avatarUrl=${avatarurl}&stat=${stat}`,
    })
  },
  start: function() {
    wx.showToast({
      title: '已开奖,无法参与活动',
      icon: 'none',
      mask: true
    })
    setTimeout(() => {
      wx.hideToast()
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const list = JSON.parse(options.data)
    const stats = this.aSort(list.list)
    console.log(stats)
    this.setData({
      list,
      users: list.list
    })
    if (list.countdown.status == '已开奖') {
      this.setData({
        isuser: false
      })
    }
  },

  aSort:function (arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        // 相邻元素两两对比，元素交换，大的元素交换到前面面
        if (arr[j].stat < arr[j + 1].stat) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const that = this
    const {
      _id
    } = that.data.list
    wx.cloud.callFunction({
      name: 'gifts',
      success: function(res) {
        const gitfs = res.result.data.filter(item => {
          return item._id == _id
        })
        that.setData({
          list: gitfs[0],
          users: gitfs[0].list
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})