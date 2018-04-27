const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fetch(url, param = {}, method = "GET", header = {'content-type':'application/json'}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: param,
      header:header,
      success: function (res) {
        let {data,statusCode,errMsg} = res;
        if(statusCode==200){
          resolve(data);
        }else{
          reject({code:statusCode,errMsg});
        }
        
      },
      fail: function (error) {
        reject(error)
      }
    })
  })

}

function doubanFetch(url, param = {}, method = "GET"){
  let doubanUrlPrefix = "http://t.yushu.im";
  let header = {'content-type': 'application/json'}
  return fetch(doubanUrlPrefix + url, param, method, header);
}

module.exports = {
  formatTime: formatTime,
  fetch,
  doubanFetch
}
