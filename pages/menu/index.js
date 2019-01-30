//获取应用实例
import {
  UserModel
} from '../../model/user.js'
const users = new UserModel();
let jobnumber = ''
let app = getApp()
Page({
  data: {},
  //事件处理函数
  jump(e) {
    let type = e.currentTarget.dataset.type
    if (type == '1') {
      wx.showToast({
        title: '暂未开放..',
        image: "../../images/error.png",
      })
      return
    }
    this.usertoken(type)

  },
  onLoad: function() {
    this._checkuserstatus();
  },
  usertoken(type) {
    wx.showLoading({
      title: '验证中...',
      mask: true,
    })
    let map = new Map().set('orderinput', '9900001').set('dailyoff-dutystatistics', '9900002').set('dayshippingstatistics', '9900003');
    users.userauth(jobnumber, map.get(type)).then(res => {
      // console.log('权限验证', res)
      if (res.code != 200) {
        wx.hideLoading();
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        return
      }
      wx.navigateTo({
        url: `../reportfrom/${type}/index`
      })
    })
  },
  _checkuserstatus() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    try {
      const user = wx.getStorageSync('user');
      jobnumber = user.username
      // console.log(jobnumer);
      // console.log('是否已经登录', user)
      if (!user) {
        // console.log('没有登入')
        wx.hideLoading()
        wx.reLaunch({
          url: '/pages/index/index'
        })
        return
      };
      this._checkUsermsg(user); // 检查用户信息是否更改过
      let isEx = this._checkuserdate(Date.now(), user.date);
      // console.log('是否已经登录', isEx)
      if (isEx) {
        wx.hideLoading()
        wx.reLaunch({
          url: '/pages/index/index'
        })
        return
      }

      wx.hideLoading()
    } catch (e) {
      console.log('用户初始化信息出错', e.message);
    }
  },
  //检查用户信息是否有效
  _checkUsermsg(user) {
    users.userlogin(user.username, user.password).then(res => {
      if (res.code == '100') {
        wx.showToast({
          title: '用户信息已失效',
        })
        wx.removeStorage({
          key: 'token'
        })
        wx.reLaunch({
          url: '/pages/index/index'
        })
        return
      }
      wx.setStorage({
        key: "token",
        data: res.token
      })
    })
  },
  //检查用户登录状态是否失效
  _checkuserdate(nowdate, olddate) {
    let nTime = nowdate - olddate;
    let day = Math.floor(nTime / 86400000);
    console.log(day);
    // return true
    return day >= 60 ? true : false;
  },
})