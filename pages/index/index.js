//这里填写登录url的接口
import {
  UserModel
} from '../../model/user.js';
import md5 from '../../util/md5.js'

const users = new UserModel();
Page({
  data: {
    username: '',
    password: ''
  },
  onLoad() {
    // this._checkuserstatus()
    // console.log('!!!')
  },
  getUsername: function(e) {
    console.log(e);
    this.setData({
      username: e.detail.value
    })
  },
  getPassword: function(e) {
    console.log(e);
    this.setData({
      password: e.detail.value
    })
  },
  submit: function(e) {
    if (!this.data.username || !this.data.password) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let psw = md5.hexMD5(this.data.password);
    console.log(" 用户名：" + this.data.username + " 密码：" + psw);
    let ret = users.userlogin(this.data.username, psw)
    ret.then(res => {
      if (res.code.toString().startsWith('1')) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        return
      }
      const user = {
        username: this.data.username,
        date: res.date,
        password: psw
      }
      //缓存用户的个人信息
      wx.setStorage({
        key: 'user',
        data: user
      })
      wx.setStorage({
        key:'token',
        data:res.token
      })
      wx.showToast({
        title: res.msg,
        image: "../../images/login_sucess.png",
        duration: 2000,
        mask: true
      })
      wx.reLaunch({
        url: '../../pages/menu/index'
      })
    })
  }
})