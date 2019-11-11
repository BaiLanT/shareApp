// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (data) => {
  const db = cloud.database()
  const item = await db.collection('gifts').doc(data._id).get()
  item.data.list.push({
    avatrUrl: data.avatarUrl,
    nickName: data.nickName,
    users: [{
      avatrUrl: '',
      nickName: '',
      stat: 0
    }]
  })
  delete item.data._id
  const result = await db.collection('gifts').doc(data._id).set({
    data: item.data
  })
  return result
}