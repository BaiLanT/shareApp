// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = (event) => {
  const {
    APPID, OPENID
  } = cloud.getWXContext()
  const db = cloud.database()
  db.collection('users').where({
    appId: APPID
  }).get().then(res => {
    if (res.data[0].appId !== APPID) {
      db.collection('users').add({
        data: {
          appId: APPID,
          openId: OPENID,
          nickName: event.res.userInfo.nickName,
          avatarUrl: event.res.userInfo.avatarUrl,
          country: {
            city: event.res.userInfo.city,
            province: event.res.userInfo.province,
            country: event.res.userInfo.country
          },
          acl: 0
        },
        success: () => {
          return {
            msg: 'ok'
          }
        }
      })
    }else{
      return {meg: 'chongfu'}
    }
  })
  return {
    userInfo: event.res.userInfo,
    appId: APPID,
    openId: OPENID
  }
}