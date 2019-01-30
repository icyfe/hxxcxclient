import {
  Http
} from '../util/http.js'

class UserModel extends Http {
  userlogin(jobnumber, password) {
    return this.request('/user/login', {
      jobnumber,
      password
    }, 'POST');
  }
  userauth(jobnumber, app_id) {
    return this.request('/user/token', {
      jobnumber,
      app_id
    })
  }
}

export {
  UserModel
}