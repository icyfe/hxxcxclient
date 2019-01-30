import {
  config
} from '../config.js'
const ERROR_CODE = {
  1: '抱歉出了一个错误',
  400: '服务器请求出错',
  401: '权限校验失败！'
}

class Http {
  request(url, data = {}, method = "GET") {
    return new Promise((resolve, rejecet) => {
      const token = _getToken();
      // console.log('权限', token);
      wx.request({
        url: config.api_blink_url + url,
        data,
        method,
        header: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        success: (res => {
          console.log(res);
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res.data)
          } else {
            // console.log(code)
            this._show_error(code)
          }
        }),
        fail: (err => {
          rejecet(err)
          this._show_error(1)
        })
      })
    })
  }
  _show_error(err_code) {
    if (!err_code) {
      err_code = 1
    }
    wx.showToast({
      title: ERROR_CODE[err_code],
      icon: 'none',
      duration: 2000
    })
  }
}

function _getToken() {
  return wx.getStorageSync('token')
}
export {
  Http
}