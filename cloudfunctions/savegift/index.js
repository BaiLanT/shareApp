// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(data) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const result = await db.collection('gifts').add({
    data: {
      countdown: data.info.countdown,
      date: data.info.date,
      time: data.info.time,
      name: data.info.name,
      num: data.info.num,
      uid: data.info.uid,
      remarks: data.info.remarks,
      list: []
    }
  })
  return {
    meg: result,
    stat: 0
  }
}