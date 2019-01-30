import {
  Http
} from '../util/http.js'

class ReportFromModel extends Http {
  getFromOne(startdate, enddate) {
    return this.request('/api/get/reportform/formone', {
      startdate,
      enddate
    })
  }
  //每日下单统计
  getOrderStatistics(year, month) {
    return this.request('/api/get/reportform/saleform/daytotal', {
      year,
      month
    })
  }
  //每日发货统计
  getOrderSend(year, month) {
    return this.request('/api/get/reportform/saleform/daydelivergoodstotal', {
      year,
      month
    })
  }
}

export {
  ReportFromModel
}