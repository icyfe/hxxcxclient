import format from '../../../util/formatdate.js'
import {
  ReportFromModel
} from '../../../model/reportfrom.js'
import F2 from '../../../f2-canvas/lib/f2';
import formatmoney from '../../../util/formatemoney.js'
let onechart = null;
let onedata = [];
let originDates = []
let twochart = null;
let twodata = [];
let map = null;
let monthtotal = null;
const form = new ReportFromModel();
Page({
  data: {
    startdate: format(new Date(), 'yyyy-MM'),
    // startdate: '2018-12',
    cloneformhead: null,
    cloneformbody: [],
    clonemonthtotal: null,
    cloneyeartotal: null,
    data: null,
    currentTab: 1,
    opts: {
      onInit: function(canvas, width, height) {
        onechart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false
        });
        onechart.source(onedata, {
          date: {
            type: 'timeCat',
            tickCount: 5,
            values: originDates.slice(0, 5),
            mask: 'MM-DD'
          },
          value: {
            tickCount: 5
          }
        });
        onechart.axis('date', {
          tickLine: {
            length: 4,
            stroke: '#cacaca'
          },
          label: {
            fill: '#cacaca'
          },
          line: {
            top: true
          }
        });
        onechart.axis('value', {
          position: 'left',
          label(text) {
            return {
              text: text,
              fill: '#333'
            };
          },
          grid: {
            stroke: '#333'
          }
        });
        onechart.tooltip({
          showItemMarker: false,
          background: {
            radius: 2,
            padding: [3, 5]
          },
          onShow(ev) {
            const items = ev.items;
            console.log(items);
            items[0].name = '';
            items[0].value = `${items[0].title}:日小计：${formatmoney(items[0].value, 2, '.', ',')}`;
          }
        });
        onechart.interval().position('date*value').style({
          radius: [2, 2, 0, 0]
        })
        // 定义进度条
        onechart.scrollBar({
          mode: 'x',
          xStyle: {
            backgroundColor: '#e8e8e8',
            fillerColor: '#808080',
            offsetY: -2
          }
        });
        onechart.interaction('pan');
        onechart.render();
        return onechart;
      }
    },
    twoopts: {
      onInit: function(canvas, width, height) {
        twochart = new F2.Chart({
          el: canvas,
          width,
          height
        });
        twochart.source(twodata);
        twochart.coord('polar', {
          transposed: true,
          radius: 0.75
        });
        twochart.legend({
          position: 'top',
          itemFormatter(val) {
            // console.log(val, twodata);
            return `${val}   ￥${map[val].toFixed(2)} 占比：${((map[val] / monthtotal) * 100).toFixed(2)}%  `;
          }
        });
        // twochart.legend(true);
        // 添加饼图文本
        twochart.pieLabel({
          sidePadding: 20,
          label1: function label1(data, color) {
            return {
              text: data.name,
              fill: color
            };
          },
          label2: function label2(data) {
            return {
              text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              fill: '#808080',
              fontWeight: 'bold'
            };
          }
        });
        twochart.axis(false);
        twochart.tooltip(true);
        twochart.interval().position('const*y').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
        twochart.render()
        return twochart;
      }
    }
  },
  bindstartdate(e) {
    let date = e.detail.value;
    if (new Date(date) > new Date()) {
      wx.showToast({
        title: '选择月份不能大于本月',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      startdate: date,
    })
    this.getData();
  },
  onLoad: function(options) {
    this.getData()
  },
  onReady() {
    setTimeout(() => {

    }, 3000)
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  getData() {
    //每次更新数据之前重新清除掉所有数据
    originDates=[];
    onedata = [];
    twodata = [];
    this.setData({
      cloneformhead:null,
      cloneyeartotal:null,
      clonemonthtotal:null,
      cloneformbody:[],
    })
    wx.showLoading({
      title: '加载中...',
    })
    let date = this.data.startdate.split('-');
    let year = date[0];
    let month = date[1];
    console.log(year, month);
    form.getOrderSend(year, month).then(res => {
      wx.hideLoading();
      console.log('数据', res.result)
      this.data.clonemonthtotal = {
        iYearMonthDay: res.result.monthtotal.iYearMonthDay,
        BusinessOne: formatmoney(res.result.monthtotal.BusinessOne, 2, '.', ','),
        BusinessTwo: formatmoney(res.result.monthtotal.BusinessTwo, 2, '.', ','),
        BusinessThree: formatmoney(res.result.monthtotal.BusinessThree, 2, '.', ','),
        BusinessFour: formatmoney(res.result.monthtotal.BusinessFour, 2, '.', ','),
        BusinessFive: formatmoney(res.result.monthtotal.BusinessFive, 2, '.', ','),
        BusinessSix: formatmoney(res.result.monthtotal.BusinessSix, 2, '.', ','),
        BusinissAll: formatmoney(res.result.monthtotal.BusinissAll, 2, '.', ','),
        BusinissHub: formatmoney(res.result.monthtotal.BusinissHub, 2, '.', ','),
        NONTaxMoney: formatmoney(res.result.monthtotal.NONTaxMoney, 2, '.', ','),
      }
      this.data.cloneyeartotal = {
        iYearMonthDay: res.result.yeartotal.iYearMonthDay,
        BusinessOne: formatmoney(res.result.yeartotal.BusinessOne, 2, '.', ','),
        BusinessTwo: formatmoney(res.result.yeartotal.BusinessTwo, 2, '.', ','),
        BusinessThree: formatmoney(res.result.yeartotal.BusinessThree, 2, '.', ','),
        BusinessFour: formatmoney(res.result.yeartotal.BusinessFour, 2, '.', ','),
        BusinessFive: formatmoney(res.result.yeartotal.BusinessFive, 2, '.', ','),
        BusinessSix: formatmoney(res.result.yeartotal.BusinessSix, 2, '.', ','),
        BusinissAll: formatmoney(res.result.yeartotal.BusinissAll, 2, '.', ','),
        BusinissHub: formatmoney(res.result.yeartotal.BusinissHub, 2, '.', ','),
        NONTaxMoney: formatmoney(res.result.yeartotal.NONTaxMoney, 2, '.', ','),
      }
      // 图表数据初始化
      this.setData({
        cloneformhead: {
          MonthTotalMoney: formatmoney(res.result.formhead.MonthTotalMoney, 2, '.', ','),
          NONTaxMoney: formatmoney(res.result.formhead.NONTaxMoney, 2, '.', ','),
          PreTotalMoney: formatmoney(res.result.formhead.PreTotalMoney, 2, '.', ','),
          SendMonthTotalMoney: formatmoney(res.result.formhead.SendMonthTotalMoney, 2, '.', ','),
          StockTotal: formatmoney(res.result.formhead.StockTotal, 2, '.', ','),
          TotalMoney: formatmoney(res.result.formhead.TotalMoney, 2, '.', ','),
          TotalNowMoney: formatmoney(res.result.formhead.TotalNowMoney, 2, '.', ','),
          TotalSendMoney: formatmoney(res.result.formhead.TotalSendMoney, 2, '.', ','),
          TotalSendMoneyNow: formatmoney(res.result.formhead.TotalSendMoneyNow, 2, '.', ','),
          TotalStock: formatmoney(res.result.formhead.TotalStock, 2, '.', ','),
          leftMoney: formatmoney(res.result.formhead.leftMoney, 2, '.', ','),
          leftMoneyIWSStockingOrder: formatmoney(res.result.formhead.leftMoneyIWSStockingOrder, 2, '.', ','),
        }
      })

      res.result.formbody.forEach(item => {
        this.data.cloneformbody.push({
          iYearMonthDay: item.iYearMonthDay,
          BusinessOne: formatmoney(item.BusinessOne, 2, '.', ','),
          BusinessTwo: formatmoney(item.BusinessTwo, 2, '.', ','),
          BusinessThree: formatmoney(item.BusinessThree, 2, '.', ','),
          BusinessFour: formatmoney(item.BusinessFour, 2, '.', ','),
          BusinessFive: formatmoney(item.BusinessFive, 2, '.', ','),
          BusinessSix: formatmoney(item.BusinessSix, 2, '.', ','),
          BusinissAll: formatmoney(item.BusinissAll, 2, '.', ','),
          BusinissHub: formatmoney(item.BusinissHub, 2, '.', ','),
          NONTaxMoney: formatmoney(item.NONTaxMoney, 2, '.', ','),
        })

        originDates.push(item.iYearMonthDay)
        onedata.push({
          date: item.iYearMonthDay,
          value: item.NONTaxMoney,
          type: '日小计'
        })
      })
      this.setData({
        cloneformbody: this.data.cloneformbody,
        clonemonthtotal: this.data.clonemonthtotal,
        cloneyeartotal: this.data.cloneyeartotal
      })
      map = {
        '业务部一': res.result.monthtotal.BusinessOne,
        '业务部二': res.result.monthtotal.BusinessTwo,
        '业务部三': res.result.monthtotal.BusinessThree,
        '业务部四': res.result.monthtotal.BusinessFour,
        '业务部五': res.result.monthtotal.BusinessFive,
        '业务部六': res.result.monthtotal.BusinessSix,
      }
      monthtotal = res.result.monthtotal.BusinissAll,
        twodata.push({
          name: '业务部一',
          y: res.result.monthtotal.BusinessOne,
          const: 'const'
        }, {
          name: '业务部二',
          y: res.result.monthtotal.BusinessTwo,
          const: 'const'
        }, {
          name: '业务部三',
          y: res.result.monthtotal.BusinessThree,
          const: 'const'
        }, {
          name: '业务部四',
          y: res.result.monthtotal.BusinessFour,
          const: 'const'
        }, {
          name: '业务部五',
          y: res.result.monthtotal.BusinessFive,
          const: 'const'
        }, {
          name: '业务部六',
          y: res.result.monthtotal.BusinessSix,
          const: 'const'
        })

      onechart.source(onedata, {
        date: {
          type: 'timeCat',
          tickCount: 5,
          values: originDates.slice(0, 5),
          mask: 'MM-DD'
        },
        value: {
          tickCount: 5
        }
      });
      console.log('更新后的数据',onedata);
      onechart.animate(false);
      // twochart.animate(false);
      onechart.changeData(onedata);
      twochart.changeData(twodata)
      this.setData({
        currentTab: 0
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
})