function gettime(date, time) {
  let status
  const that = this
  const nowtime = Date.now()
  const daynum = Date.parse(date.replace(/-/g, "/") + ' ' + time)
  let downtime = nowtime + (daynum - nowtime)
  let stoptime = daynum - nowtime
  if (daynum - nowtime > 0) {
    status = '进行中～'
  } else {
    status = '已开奖'
  }
  let countdown = {
    downtime,
    stoptime,
    status
  }
  return countdown
}
module.exports = {
  gettime: gettime
}