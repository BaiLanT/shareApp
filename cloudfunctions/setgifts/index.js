// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(data) => {
  const db = cloud.database()
  let item = await db.collection('gifts').where({}).get()
  item = data.day
  item.forEach(async li => {
    console.log(li)
    await db.collection('gifts').doc(li._id).update({
      data:{
       countdown: li.countdown
      }
    })
  })
  return item
}