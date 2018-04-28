

const utils = {
  formatTime: date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },

  formatNumber: n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  getRandomNum: (min = 0, max = 10) => {
    if (min >= max) {
      throw "最小值不能大于或等于最大值";
    }
    return Math.floor(Math.random() * (max - min) - min);
  },

  getRandomStr: (length = 18, timestamp = true) => {
    let s = "abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ";
    if (length < 13 && timestamp) {
      throw "若是要时间戳，字符串长度必须大于13";
    }
    let r = timestamp ? new Date().getTime() + "" : "";
    let _length = length - r.length;
    while (_length > 0) {
      r += s[utils.getRandomNum(0, s.length - 1)];
      _length--;
    }
    return r;
  },

  fetch: (url, param = {}, method = "GET", header = { 'Content-Type': 'application/json' }) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: param,
        header: header,
        success: function (res) {
          let { data, statusCode, errMsg } = res;
          if (statusCode == 200) {
            resolve(data);
          } else {
            reject({ code: statusCode, errMsg });
          }

        },
        fail: function (error) {
          reject(error)
        }
      })
    })

  },

  doubanFetch: (url, param = {}, method = "GET") => {
    // let doubanUrlPrefix = "http://t.yushu.im";
    let doubanUrlPrefix = "https://douban.uieee.com";
    let header = { 'Content-Type': 'application/xml' }
    return utils.fetch(doubanUrlPrefix + url, param, method, header);
  }
}

export default utils;
