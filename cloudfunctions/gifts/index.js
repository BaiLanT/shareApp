// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(id) => {
  const db = cloud.database()
  const result = await db.collection('gifts').where({}).get()
  return result
}