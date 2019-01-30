//produce_faliao.js
//获取应用实例
var app = getApp();
var url = "https://wx.rtdsoft.com/Messc01h/PagingList";
Page({
  data: {
	title: "工单进度看板",
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

				var res = result.data.rows;
				var total_record = 0;
				for(var i=0; i< res.length; i++)
				{
					var leaf_nunm = res[i].sc_qty - res[i].sc_dlqty;
					res[i].leaf_nunm = leaf_nunm;
					
					var produce_hegerate = isNaN(parseInt(res[i].sc_dlqty) /  parseInt(res[i].sc_qty)) ? 0 : (parseInt(res[i].sc_dlqty) /  parseInt(res[i].sc_qty)).toFixed(2) * 100;
				
					if(produce_hegerate == 100)
					{
						var status_color = "kanban100";
						var status_color2 = "green";
					}
					if(produce_hegerate >= 90 && produce_hegerate <100)
					{
						var status_color = "kanban90";
						var status_color2 = "green";
					}
					if(produce_hegerate >= 70 && produce_hegerate <90)
					{
						var status_color = "kanban70";
						var status_color2 = "red";
					}
					if(produce_hegerate >= 50 && produce_hegerate <70)
					{
						var status_color = "kanban50";
						var status_color2 = "orange";
					}
					if(produce_hegerate >= 30 && produce_hegerate <50)
					{
						var status_color = "kanban30";
						var status_color2 = "blue";
					}
					if(produce_hegerate > 0 && produce_hegerate <30)
					{
						var status_color = "kanban0";
						var status_color2 = "blue";
					}
					if(produce_hegerate == 0)
					{
						var status_color = "kanban0";
						var status_color2 = "gray";
					}
					res[i].status_color = status_color;
					res[i].status_color2 = status_color2;
					res[i].produce_hegerate = produce_hegerate;
					total_record++;
				}

				that.setData({
					items: res,
					current_page: 1,
					total_page: 1,
					total_record: total_record
				})
			},
      fail: function (result) {
        var result = {
          "total": 12898,
          "rows": [{
            "sc_odno": "A13050001",
            "sc_odno1": "",
            "el_no": "IVANTEST",
            "el_name": "",
            "r_el_no": "",
            "r_el_unit": "",
            "el_ver": "",
            "sc_frozen": "2",
            "enmvalue": "排产",
            "sc_type": "1",
            "r_sc_type": "正常",
            "pc_sort": "01",
            "ch_name": "薛文凤",
            "bo_runo": "TK-N1",
            "bo_remk": "测试流程",
            "sc_prno": "AP 01",
            "sc_prna": "",
            "mo_no": "",
            "mo_name": "",
            "sc_endat": "2013/05/19",
            "sc_redat": "",
            "sc_date": "2013/05/19",
            "sc_qty": 100.0000,
            "sc_rate": 0.0000,
            "sc_prdat": "2015/05/19",
            "sc_fdat": "2013/05/19",
            "sc_dlot": 0.0000,
            "sc_bdqty": 0.0000,
            "od_no": "",
            "sc_bodno": "",
            "sc_remk": "",
            "sc_dlqty": 0.0000,
            "cu_pono": "",
            "r_sc_fqty": 100.0000,
            "sc_modno": "",
            "r_sc_qty": 100.0000,
            "r_dl_qty": 100.0000,
            "r_sc_dlqty": 100.0000,
            "sc_fqc": 0.0000,
            "r_sc_fqc": 100.0000,
            "sc_doqty": 0.0000,
            "sc_plqty": 0.0000,
            "sc_code": "",
            "sc_order": 0,
            "ta_time": 0,
            "sc_wip": 0.000000,
            "sc_frozen1": "",
            "wip_qty": 0,
            "sc_bono": "",
            "sc_eare": "",
            "is_turnoutbound": "",
            "cu_no": "",
            "r_cu_no": "",
            "rtd_ymd": "2013/05/19",
            "rtd_time": "10:39:22",
            "rtd_user": "ADMIN",
            "rtd_lymd": "2014/10/27",
            "rtd_ltime": "11:22:35",
            "rtd_luser": "tianxx",
            "ruid": 13525,
            "guid": null,
            "org_no": "",
            "rtd_cymd": "",
            "rtd_ctime": "",
            "rtd_cuser": "",
            "rtd_cancel": "",
            "rtd_symd": "2013/05/19",
            "rtd_stime": "10:41:33",
            "rtd_suser": "ADMIN",
            "rtd_sure": "Y",
            "rtd_attach": "",
            "ref_id": 0
          }, {
              "sc_odno": "A13050002",
              "sc_odno1": "",
              "el_no": "IVANTEST",
              "el_name": "",
              "r_el_no": "",
              "r_el_unit": "",
              "el_ver": "",
              "sc_frozen": "2",
              "enmvalue": "排产",
              "sc_type": "1",
              "r_sc_type": "正常",
              "pc_sort": "01",
              "ch_name": "薛文凤",
              "bo_runo": "TK-N1",
              "bo_remk": "测试流程",
              "sc_prno": "AP 01",
              "sc_prna": "",
              "mo_no": "",
              "mo_name": "",
              "sc_endat": "2013/05/19",
              "sc_redat": "",
              "sc_date": "2013/05/19",
              "sc_qty": 100.0000,
              "sc_rate": 0.0000,
              "sc_prdat": "2015/05/19",
              "sc_fdat": "2013/05/19",
              "sc_dlot": 0.0000,
              "sc_bdqty": 0.0000,
              "od_no": "",
              "sc_bodno": "",
              "sc_remk": "",
              "sc_dlqty": 0.0000,
              "cu_pono": "",
              "r_sc_fqty": 100.0000,
              "sc_modno": "",
              "r_sc_qty": 100.0000,
              "r_dl_qty": 100.0000,
              "r_sc_dlqty": 100.0000,
              "sc_fqc": 0.0000,
              "r_sc_fqc": 100.0000,
              "sc_doqty": 0.0000,
              "sc_plqty": 0.0000,
              "sc_code": "",
              "sc_order": 0,
              "ta_time": 0,
              "sc_wip": 0.000000,
              "sc_frozen1": "",
              "wip_qty": 0,
              "sc_bono": "",
              "sc_eare": "",
              "is_turnoutbound": "",
              "cu_no": "",
              "r_cu_no": "",
              "rtd_ymd": "2013/05/19",
              "rtd_time": "13:20:25",
              "rtd_user": "ADMIN",
              "rtd_lymd": "",
              "rtd_ltime": "",
              "rtd_luser": "",
              "ruid": 13526,
              "guid": null,
              "org_no": "",
              "rtd_cymd": "",
              "rtd_ctime": "",
              "rtd_cuser": "",
              "rtd_cancel": "",
              "rtd_symd": "2013/05/19",
              "rtd_stime": "13:20:28",
              "rtd_suser": "ADMIN",
              "rtd_sure": "Y",
              "rtd_attach": "",
              "ref_id": 0
            }, {
              "sc_odno": "A13050003",
              "sc_odno1": "",
              "el_no": "IVANTEST",
              "el_name": "",
              "r_el_no": "",
              "r_el_unit": "",
              "el_ver": "",
              "sc_frozen": "2",
              "enmvalue": "排产",
              "sc_type": "1",
              "r_sc_type": "正常",
              "pc_sort": "01",
              "ch_name": "薛文凤",
              "bo_runo": "TK-N1",
              "bo_remk": "测试流程",
              "sc_prno": "01",
              "sc_prna": "",
              "mo_no": "",
              "mo_name": "",
              "sc_endat": "2013/05/19",
              "sc_redat": "",
              "sc_date": "2013/05/19",
              "sc_qty": 100.0000,
              "sc_rate": 0.0000,
              "sc_prdat": "2015/05/19",
              "sc_fdat": "2013/05/19",
              "sc_dlot": 0.0000,
              "sc_bdqty": 0.0000,
              "od_no": "",
              "sc_bodno": "",
              "sc_remk": "",
              "sc_dlqty": 0.0000,
              "cu_pono": "",
              "r_sc_fqty": 100.0000,
              "sc_modno": "",
              "r_sc_qty": 100.0000,
              "r_dl_qty": 100.0000,
              "r_sc_dlqty": 100.0000,
              "sc_fqc": 0.0000,
              "r_sc_fqc": 100.0000,
              "sc_doqty": 0.0000,
              "sc_plqty": 0.0000,
              "sc_code": "",
              "sc_order": 0,
              "ta_time": 0,
              "sc_wip": 0.000000,
              "sc_frozen1": "",
              "wip_qty": 0,
              "sc_bono": "",
              "sc_eare": "",
              "is_turnoutbound": "",
              "cu_no": "",
              "r_cu_no": "",
              "rtd_ymd": "2013/05/19",
              "rtd_time": "13:34:27",
              "rtd_user": "ADMIN",
              "rtd_lymd": "2014/07/21",
              "rtd_ltime": "15:14:41",
              "rtd_luser": "ADMIN",
              "ruid": 13527,
              "guid": null,
              "org_no": "",
              "rtd_cymd": "",
              "rtd_ctime": "",
              "rtd_cuser": "",
              "rtd_cancel": "",
              "rtd_symd": "2013/05/19",
              "rtd_stime": "13:34:30",
              "rtd_suser": "ADMIN",
              "rtd_sure": "Y",
              "rtd_attach": "",
              "ref_id": 0
            }, {
              "sc_odno": "A13050004",
              "sc_odno1": "",
              "el_no": "IVANTEST",
              "el_name": "",
              "r_el_no": "",
              "r_el_unit": "",
              "el_ver": "",
              "sc_frozen": "2",
              "enmvalue": "排产",
              "sc_type": "1",
              "r_sc_type": "正常",
              "pc_sort": "01",
              "ch_name": "薛文凤",
              "bo_runo": "TK-N1",
              "bo_remk": "测试流程",
              "sc_prno": "AP 01",
              "sc_prna": "",
              "mo_no": "",
              "mo_name": "",
              "sc_endat": "2013/05/19",
              "sc_redat": "",
              "sc_date": "2013/05/19",
              "sc_qty": 100.0000,
              "sc_rate": 0.0000,
              "sc_prdat": "2015/05/19",
              "sc_fdat": "2013/05/19",
              "sc_dlot": 0.0000,
              "sc_bdqty": 0.0000,
              "od_no": "",
              "sc_bodno": "",
              "sc_remk": "",
              "sc_dlqty": 0.0000,
              "cu_pono": "",
              "r_sc_fqty": 100.0000,
              "sc_modno": "",
              "r_sc_qty": 100.0000,
              "r_dl_qty": 100.0000,
              "r_sc_dlqty": 100.0000,
              "sc_fqc": 0.0000,
              "r_sc_fqc": 100.0000,
              "sc_doqty": 0.0000,
              "sc_plqty": 0.0000,
              "sc_code": "",
              "sc_order": 0,
              "ta_time": 0,
              "sc_wip": 0.000000,
              "sc_frozen1": "",
              "wip_qty": 0,
              "sc_bono": "",
              "sc_eare": "",
              "is_turnoutbound": "",
              "cu_no": "",
              "r_cu_no": "",
              "rtd_ymd": "2013/05/19",
              "rtd_time": "13:51:54",
              "rtd_user": "ADMIN",
              "rtd_lymd": "2015/04/26",
              "rtd_ltime": "10:29:26",
              "rtd_luser": "tianxx",
              "ruid": 13528,
              "guid": null,
              "org_no": "",
              "rtd_cymd": "",
              "rtd_ctime": "",
              "rtd_cuser": "",
              "rtd_cancel": "",
              "rtd_symd": "2015/04/26",
              "rtd_stime": "10:29:26",
              "rtd_suser": "tianxx",
              "rtd_sure": "Y",
              "rtd_attach": "",
              "ref_id": 0
            }, {
              "sc_odno": "A13050005",
              "sc_odno1": "",
              "el_no": "0JUTES*BK682M0***125250",
              "el_name": "",
              "r_el_no": "",
              "r_el_unit": "",
              "el_ver": "",
              "sc_frozen": "2",
              "enmvalue": "排产",
              "sc_type": "1",
              "r_sc_type": "正常",
              "pc_sort": "01",
              "ch_name": "薛文凤",
              "bo_runo": "TK-N1",
              "bo_remk": "测试流程",
              "sc_prno": "HA 01",
              "sc_prna": "组立",
              "mo_no": "",
              "mo_name": "",
              "sc_endat": "2013/05/20",
              "sc_redat": "",
              "sc_date": "2013/05/20",
              "sc_qty": 12.0000,
              "sc_rate": 0.0000,
              "sc_prdat": "2015/05/20",
              "sc_fdat": "2013/05/20",
              "sc_dlot": 0.0000,
              "sc_bdqty": 0.0000,
              "od_no": "",
              "sc_bodno": "",
              "sc_remk": "",
              "sc_dlqty": 0.0000,
              "cu_pono": "",
              "r_sc_fqty": 12.0000,
              "sc_modno": "",
              "r_sc_qty": 12.0000,
              "r_dl_qty": 12.0000,
              "r_sc_dlqty": 12.0000,
              "sc_fqc": 0.0000,
              "r_sc_fqc": 12.0000,
              "sc_doqty": 0.0000,
              "sc_plqty": 0.0000,
              "sc_code": "",
              "sc_order": 0,
              "ta_time": 0,
              "sc_wip": 0.000000,
              "sc_frozen1": "",
              "wip_qty": 0,
              "sc_bono": "",
              "sc_eare": "",
              "is_turnoutbound": "",
              "cu_no": "",
              "r_cu_no": "",
              "rtd_ymd": "2013/05/20",
              "rtd_time": "17:45:18",
              "rtd_user": "ADMIN",
              "rtd_lymd": "",
              "rtd_ltime": "",
              "rtd_luser": "",
              "ruid": 13529,
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
              "sc_odno": "A13060001",
              "sc_odno1": "",
              "el_no": "IVANTEST",
              "el_name": "",
              "r_el_no": "",
              "r_el_unit": "",
              "el_ver": "",
              "sc_frozen": "2",
              "enmvalue": "排产",
              "sc_type": "1",
              "r_sc_type": "正常",
              "pc_sort": "01",
              "ch_name": "薛文凤",
              "bo_runo": "TK-N1",
              "bo_remk": "测试流程",
              "sc_prno": "AP 01",
              "sc_prna": "",
              "mo_no": "",
              "mo_name": "",
              "sc_endat": "2013/06/07",
              "sc_redat": "",
              "sc_date": "2013/06/07",
              "sc_qty": 10.0000,
              "sc_rate": 0.0000,
              "sc_prdat": "2015/06/07",
              "sc_fdat": "2013/06/07",
              "sc_dlot": 0.0000,
              "sc_bdqty": 0.0000,
              "od_no": "",
              "sc_bodno": "",
              "sc_remk": "",
              "sc_dlqty": 0.0000,
              "cu_pono": "",
              "r_sc_fqty": 10.0000,
              "sc_modno": "",
              "r_sc_qty": 10.0000,
              "r_dl_qty": 10.0000,
              "r_sc_dlqty": 10.0000,
              "sc_fqc": 0.0000,
              "r_sc_fqc": 10.0000,
              "sc_doqty": 0.0000,
              "sc_plqty": 0.0000,
              "sc_code": "",
              "sc_order": 0,
              "ta_time": 0,
              "sc_wip": 0.000000,
              "sc_frozen1": "",
              "wip_qty": 0,
              "sc_bono": "",
              "sc_eare": "",
              "is_turnoutbound": "",
              "cu_no": "",
              "r_cu_no": "",
              "rtd_ymd": "2013/06/07",
              "rtd_time": "13:58:51",
              "rtd_user": "ADMIN",
              "rtd_lymd": "",
              "rtd_ltime": "",
              "rtd_luser": "",
              "ruid": 13530,
              "guid": null,
              "org_no": "",
              "rtd_cymd": "",
              "rtd_ctime": "",
              "rtd_cuser": "",
              "rtd_cancel": "",
              "rtd_symd": "2013/06/07",
              "rtd_stime": "13:59:25",
              "rtd_suser": "ADMIN",
              "rtd_sure": "Y",
              "rtd_attach": "",
              "ref_id": 0
            }]
        }


        //例子
        var res = result.rows;
        var total_record = 0;
        for (var i = 0; i < res.length; i++) {
          var leaf_nunm = res[i].sc_qty - res[i].sc_dlqty;
          res[i].leaf_nunm = leaf_nunm;

          var produce_hegerate = isNaN(parseInt(res[i].sc_dlqty) / parseInt(res[i].sc_qty)) ? 0 : (parseInt(res[i].sc_dlqty) / parseInt(res[i].sc_qty)).toFixed(2) * 100;

          if (produce_hegerate == 100) {
            var status_color = "kanban100";
            var status_color2 = "green";
          }
          if (produce_hegerate >= 90 && produce_hegerate < 100) {
            var status_color = "kanban90";
            var status_color2 = "green";
          }
          if (produce_hegerate >= 70 && produce_hegerate < 90) {
            var status_color = "kanban70";
            var status_color2 = "red";
          }
          if (produce_hegerate >= 50 && produce_hegerate < 70) {
            var status_color = "kanban50";
            var status_color2 = "orange";
          }
          if (produce_hegerate >= 30 && produce_hegerate < 50) {
            var status_color = "kanban30";
            var status_color2 = "blue";
          }
          if (produce_hegerate > 0 && produce_hegerate < 30) {
            var status_color = "kanban0";
            var status_color2 = "blue";
          }
          if (produce_hegerate == 0) {
            var status_color = "kanban0";
            var status_color2 = "gray";
          }
          res[i].status_color = status_color;
          res[i].status_color2 = status_color2;
          res[i].produce_hegerate = produce_hegerate;
          total_record++;
        }

        that.setData({
          items: res,
          current_page: 1,
          total_page: 1,
          total_record: total_record
        })

      }
		});
	}
})
