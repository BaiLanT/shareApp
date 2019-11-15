// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(data) => {
  const {
    APPID,
    OPENID
  } = cloud.getWXContext()
  const db = cloud.database()
  const item = await db.collection('gifts').doc(data._id).get()
  if (!data.share) {
    item.data.list = data.users
  }else {
    item.data.list.forEach(item => {
      if (item.uid == data.uid) {
        item.users = data.users
        item.stat = data.stat
      }
    })
  }
  delete item.data._id
  const result = await db.collection('gifts').doc(data._id).set({
    data: item.data
  })
  return result
}