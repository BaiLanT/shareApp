// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (data) => {
  const { OPENID} = cloud.getWXContext()
  const db = cloud.database()
  if (!data.uid){
    const result = await db.collection('gifts').where({}).get()
    const list = []
    result.data.forEach(item => {
      item.list.forEach(lists => {
        if (lists.uid == OPENID) {
          list.push(item)
        }
      })
    })
    return list
  }else{
    const result = await db.collection('gifts').where({
      _id: data._id
    }).get()
    const users = result.data[0].list.filter(item => {
      return item.uid == data.uid
    })
    return { users: users[0], openid: OPENID}
  }
}