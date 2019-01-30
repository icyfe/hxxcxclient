//gongxu_task.js
//获取应用实例
var app = getApp()
var url = "https://www.baidu.com"; //修改对应的后台的接口
var page = 0;
var page_size = 20;
var sort = "last";

// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that) {
  that.setData({
    hidden: false
  });
  var sc_frozen = 0;
  switch (that.data.currentTab) {
    case 0:
      sc_frozen = 3; //待开工
      break;
    case 1:
      sc_frozen = 2; //生产中
      break;
    case 2:
      sc_frozen = 1; //已完工
      break;
  }
  wx.request({
    url: url,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      rtd_user: app.data.userName,
      sc_frozen: sc_frozen,
      sort: "[ruid]"
    },
    success: function(res) {
      var list = res.data.rows;
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    },
    fail: function(res) {
      var result = {
        "total": 56703,
        "rows": [{
          "sc_odno": "CP011503000067",
          "bo_seq": "0003",
          "pt_no": "SMZJ",
          "pt_name": "",
          "pt_perty": "",
          "sc_prno": "LSX",
          "sc_prna": "流水线",
          "st_no": "",
          "st_na": "",
          "sc_fdat": "",
          "bo_cyclh": 0,
          "bo_cyclm": 0,
          "bo_cycls": 0,
          "bo_leadh": 0,
          "bo_leadm": 0,
          "bo_leads": 0,
          "bo_cell": 0.0000,
          "bo_ceunit": "",
          "pt_qcyn": "N",
          "pt_wiyn": "Y",
          "sn_link": "",
          "sc_prdat": "",
          "sc_prhur": 0.0000,
          "sc_prmin": 0.0000,
          "time_lot": 0.0000,
          "sc_doqty": 0.0000,
          "sc_dlqty": 0.0000,
          "sc_adj": 0.0000,
          "sc_bdqty": 0.0000,
          "sc_ngqty": 0.0000,
          "sc_qty": 0.0000,
          "sc_reqty": 0.0000,
          "pt_spl": "",
          "aql_no": "",
          "sc_wip": 0.0000,
          "sc_dlwip": 0.0000,
          "sc_ymin": 0,
          "qc_first": "",
          "qcf_fin": "",
          "mr_group": "",
          "time_ptno": "",
          "r_time_ptno": "",
          "rtd_ymd": "",
          "rtd_time": "",
          "rtd_user": "",
          "rtd_lymd": "2016/01/15",
          "rtd_ltime": "14:57:40",
          "rtd_luser": "ADMIN",
          "ruid": 1,
          "guid": null,
          "org_no": "",
          "rtd_cymd": "",
          "rtd_ctime": "",
          "rtd_cuser": "",
          "rtd_cancel": "",
          "rtd_symd": "",
          "rtd_stime": "",
          "rtd_suser": "",
          "rtd_sure": "",
          "rtd_attach": "",
          "ref_id": 0
        }, {
          "sc_odno": "CP011503000067",
          "bo_seq": "0004",
          "pt_no": "TXJY",
          "pt_name": "",
          "pt_perty": "",
          "sc_prno": "LSX",
          "sc_prna": "流水线",
          "st_no": "",
          "st_na": "",
          "sc_fdat": "",
          "bo_cyclh": 0,
          "bo_cyclm": 0,
          "bo_cycls": 0,
          "bo_leadh": 0,
          "bo_leadm": 0,
          "bo_leads": 0,
          "bo_cell": 0.0000,
          "bo_ceunit": "",
          "pt_qcyn": "N",
          "pt_wiyn": "Y",
          "sn_link": "",
          "sc_prdat": "",
          "sc_prhur": 0.0000,
          "sc_prmin": 0.0000,
          "time_lot": 0.0000,
          "sc_doqty": 0.0000,
          "sc_dlqty": 0.0000,
          "sc_adj": 0.0000,
          "sc_bdqty": 0.0000,
          "sc_ngqty": 0.0000,
          "sc_qty": 0.0000,
          "sc_reqty": 0.0000,
          "pt_spl": "",
          "aql_no": "",
          "sc_wip": 0.0000,
          "sc_dlwip": 0.0000,
          "sc_ymin": 0,
          "qc_first": "",
          "qcf_fin": "",
          "mr_group": "",
          "time_ptno": "",
          "r_time_ptno": "",
          "rtd_ymd": "",
          "rtd_time": "",
          "rtd_user": "",
          "rtd_lymd": "2016/01/15",
          "rtd_ltime": "14:57:40",
          "rtd_luser": "ADMIN",
          "ruid": 2,
          "guid": null,
          "org_no": "",
          "rtd_cymd": "",
          "rtd_ctime": "",
          "rtd_cuser": "",
          "rtd_cancel": "",
          "rtd_symd": "",
          "rtd_stime": "",
          "rtd_suser": "",
          "rtd_sure": "",
          "rtd_attach": "",
          "ref_id": 0
        }]
      }

      var list = result.rows;

      //例子
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    title: "工序任务"
  },
  onLoad: function() {
    var that = this;
    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          scrollHeight: res.windowHeight
        });
      }
    });
    wx.setNavigationBarTitle({
      title: that.data.title
    })
  },
  onShow: function() {
    //  在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
  },
  bindDownLoad: function() {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function(event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function(event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    GetList(that);
  },
  swichNav: function(e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      GetList(that);
    }
  }
})