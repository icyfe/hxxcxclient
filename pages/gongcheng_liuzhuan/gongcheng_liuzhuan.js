//获取应用实例
var app = getApp();
var url = app.data.server_url + "Mespq02h/PagingList";
Page({
  data: {
	title: "生产质量看板",
	time : '',
	items: '',
	current_page: 1,
	total_page: 1,
	total_record: 1
  },
  onLoad: function () {
	var that = this;
	setInterval(function(){
		
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + date.getHours() + seperator2 + date.getMinutes()
				+ seperator2 + date.getSeconds();
	   that.setData({
		  time: currentdate
	   })
						 
	}, 1000);
	setInterval(function(){that.load_data_produce();}, 10000);
	that.load_data_produce();
    wx.setNavigationBarTitle({
      title: that.data.title
    })
  },
  load_data_produce: function()
  {
	    var that = this;
		wx.request({
			url: url,
			method: 'post',
			header: {
			   'Content-Type': 'application/x-www-form-urlencoded'
			},
			data:{
			  rtd_user: app.data.userName, 
			  sort: "[ruid]"
			},
			success: function (result) {
        console.log(result);
			},
      fail: function (res) {
        var result = {
          "total": 5,
          "titles": { "t_xh": "序号", "t_cpxh": "产品型号", "t_gdh": "工单号", "t_lcdh": "流程单号", "t_ymb1": "压敏胶1", "t_ymb2": "压敏胶2", "t_ymb3": "压敏胶3", "t_gwj1": "高温胶1", "t_gwj2": "高温胶2", "t_cxcq": "成型冲切", "t_ict": "ICT", "t_sl": "烧录" },
          "rows": [
            { "xh": "1", "cpxh": "3020206035AA", "gdh": "A0001", "lcdh": "PR01", "ymb1": "0", "ymb1_detail": "", "ymb2": "0", "ymb2_detail": "", "ymb3": "1", "ymb3_detail": "压敏胶 32#", "gwj1": "2", "gwj1_detail": "", "gwj2": "2", "gwj2_detail": "", "cxcq": "2", "cxcq_detail": "", "ict": "0", "ict_detail": "", "sl": "1", "sl_detail": "" },
            { "xh": "2", "cpxh": "3020206035AA", "gdh": "A0001", "lcdh": "PR01", "ymb1": "0", "ymb1_detail": "", "ymb2": "0", "ymb2_detail": "", "ymb3": "1", "ymb3_detail": "压敏胶 32#", "gwj1": "2", "gwj1_detail": "", "gwj2": "2", "gwj2_detail": "", "cxcq": "2", "cxcq_detail": "", "ict": "0", "ict_detail": "", "sl": "1", "sl_detail": "" },
            { "xh": "3", "cpxh": "3020206035AA", "gdh": "A0001", "lcdh": "PR01", "ymb1": "0", "ymb1_detail": "", "ymb2": "0", "ymb2_detail": "", "ymb3": "1", "ymb3_detail": "压敏胶 32#", "gwj1": "2", "gwj1_detail": "", "gwj2": "2", "gwj2_detail": "", "cxcq": "2", "cxcq_detail": "", "ict": "0", "ict_detail": "", "sl": "1", "sl_detail": "" },
            { "xh": "4", "cpxh": "3020206035AA", "gdh": "A0001", "lcdh": "PR01", "ymb1": "0", "ymb1_detail": "", "ymb2": "0", "ymb2_detail": "", "ymb3": "1", "ymb3_detail": "压敏胶 32#", "gwj1": "2", "gwj1_detail": "", "gwj2": "2", "gwj2_detail": "", "cxcq": "2", "cxcq_detail": "", "ict": "0", "ict_detail": "", "sl": "1", "sl_detail": "" },
            { "xh": "5", "cpxh": "3020206035AA", "gdh": "A0001", "lcdh": "PR01", "ymb1": "0", "ymb1_detail": "", "ymb2": "0", "ymb2_detail": "", "ymb3": "1", "ymb3_detail": "压敏胶 32#", "gwj1": "2", "gwj1_detail": "", "gwj2": "2", "gwj2_detail": "", "cxcq": "2", "cxcq_detail": "", "ict": "0", "ict_detail": "", "sl": "1", "sl_detail": "" }
          ]
        }

        //例子
        var res = result.rows;
        var titles = result.titles;
        var total_record = 0;
        //颜色状态 0白色 1绿色 2红色 3蓝色

        var status_color1 = "";
        var status_color2 = "";
        var status_color3 = "";
        var status_color4 = "";
        var status_color5 = "";
        var status_color6 = "";
        var status_color7 = "";
        var status_color8 = "";

        for(var i = 0; i < res.length; i++) {
          // var porduct_status = isNaN()
          if (res[i].ymb1 == "0") {
            status_color1 = "lights_red";
          } else if (res[i].ymb1 == 1) {
            status_color1 = "lights_red";
          } else if (res[i].ymb1 == 2) {
            status_color1 = "lights_red";
          } else if (res[i].ymb1 == 3) {
            status_color1 = "lights_bule";
          }

          if (res[i].ymb2 == 0) {
            status_color2 = "lights_white";
          } else if (res[i].ymb2 == 1) {
            status_color2 = "lights_green";
          } else if (res[i].ymb2 == 2) {
            status_color2 = "lights_red";
          } else if (res[i].ymb2 == 3) {
            status_color2 = "lights_bule";
          }

          if (res[i].ymb3 == 0) {
            status_color3 = "lights_white";
          } else if (res[i].ymb3 == 1) {
            status_color3 = "lights_green";
          } else if (res[i].ymb3 == 2) {
            status_color3 = "lights_red";
          } else if (res[i].ymb3 == 3) {
            status_color3 = "lights_bule";
          }

          if (res[i].gwj1 == 0) {
            status_color4 = "lights_white";
          } else if (res[i].gwj1 == 1) {
            status_color4 = "lights_green";
          } else if (res[i].gwj1 == 2) {
            status_color4 = "lights_red";
          } else if (res[i].gwj1 == 3) {
            status_color4 = "lights_bule";
          }

          if (res[i].gwj2 == 0) {
            status_color5 = "lights_white";
          } else if (res[i].gwj2 == 1) {
            status_color5 = "lights_green";
          } else if (res[i].gwj2 == 2) {
            status_color5 = "lights_red";
          } else if (res[i].gwj2 == 3) {
            status_color5 = "lights_bule";
          }

          if (res[i].cxcq == 0) {
            status_color6 = "lights_white";
          } else if (res[i].cxcq == 1) {
            status_color6 = "lights_green";
          } else if (res[i].cxcq == 2) {
            status_color6 = "lights_red";
          } else if (res[i].cxcq == 3) {
            status_color6 = "lights_bule";
          }

          if (res[i].ict == 0) {
            status_color7 = "lights_white";
          } else if (res[i].ict == 1) {
            status_color7 = "lights_green";
          } else if (res[i].ict == 2) {
            status_color7 = "lights_red";
          } else if (res[i].ict == 3) {
            status_color7 = "lights_bule";
          }

          if (res[i].sl == 0) {
            status_color8 = "lights_white";
          } else if (res[i].sl == 1) {
            status_color8 = "lights_green";
          } else if (res[i].sl == 2) {
            status_color8 = "lights_red";
          } else if (res[i].sl == 3) {
            status_color8 = "lights_bule";
          }

          res[i].status_color1 = status_color1;
          res[i].status_color2 = status_color2;
          res[i].status_color3 = status_color3;
          res[i].status_color4 = status_color4;
          res[i].status_color5 = status_color5;
          res[i].status_color6 = status_color6;
          res[i].status_color7 = status_color7;
          res[i].status_color8 = status_color8;
          total_record++;
        }

        

        that.setData({
          items: res,
          titles: titles,
          current_page: 1,
          total_page: 1,
          total_record: total_record
        })
      }
		});
	}
})
