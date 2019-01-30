//表一： 接单发货投料入库表
import {
  ReportFromModel
} from '../../../model/reportfrom.js'
import F2 from '../../../f2-canvas/lib/f2';
import format from '../../../util/formatdate.js'
import formatmoney from '../../../util/formatemoney.js'
const fromone = new ReportFromModel();
let chartdata = []
let twochartdata = []
let chart = null
let twochart = null
const originDates = []

Page({
  data: {
    startdate: '',
    enddate: '',
    listdata: [],
    total: null,
    isShow: true,
    opts: {
      onInit: function(canvas, width, height) {
        console.log('初始化是否有数据', chartdata)
        chart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false,
        });
        chart.source(chartdata, {
          year: {
            type: 'timeCat',
            tickCount: 3,
            rangs: [0, 1],
            mask: 'YYYY-MM-DD',
            values: originDates.slice(0, 84)
            // ticks: originDates
          },
          value: {
            tickCount: 6
          }
        });
        chart.axis('year', {
          tickLine: {
            length: 4,
            stroke: '#cacaca'
          },
          line: {
            top: true
          },
          label: function label(text, index, total) {
            var cfg = {
              textAlign: 'center'
            };
            if (index === 0) {
              cfg.textAlign = 'start';
            } else if (index === total - 1) {
              cfg.textAlign = 'end';
            }

            var arr = text.split('-');
            if (arr[0] === '2019') {
              cfg.text = arr[1] + '-' + arr[2];
            }
            return cfg;
          }
        });
        chart.tooltip({
          showCrosshairs: true,
          showItemMarker: false,
          background: {
            radius: 2,
            fill: '#1890FF',
            padding: [3, 5]
          },
          nameStyle: {
            fill: '#fff'
          },
          onShow(ev) {
            const items = ev.items;

            items[0].name = `${items[0].title}：${items[0].name}`;

            // console.log(items);
          }
        });

        chart.line({
          connectNulls: true
        }).position('year*value').color('type', val => {
          if (val === '接单') {
            return 'pink';
          } else if (val == '发货') {
            return '#ff0000'
          } else if (val == '投料') {
            return '#000'
          } else if (val == '入库') {
            return 'green'
          }
        });
        chart.point()
          .position('year*value')
          .style({
            lineWidth: 1,
            stroke: '#fff'
          }).color('type', val => {
            if (val === '接单') {
              return 'pink';
            } else if (val == '发货') {
              return '#ff0000'
            } else if (val == '投料') {
              return '#000'
            } else if (val == '入库') {
              return 'green'
            }
          });

        // 定义进度条
        chart.scrollBar({
          mode: 'x',
          xStyle: {
            backgroundColor: '#e8e8e8',
            fillerColor: '#808080',
            offsetY: -2
          }
        });
        chart.interaction('pan');
        chart.render();
        return chart;
      }
    },
    twoopts: {
      onInit: function(canvas, width, height) {
        twochart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false,
        });

        twochart.source(twochartdata, {
          total: {
            tickCount: 5
          }
        });
        twochart.tooltip({
          showItemMarker: true,
          onShow: function onShow(ev) {
            var items = ev.items;
            items[0].name = `${items[0].title}:${items[0].origin.total}`;
            items[0].value = null;
            console.log(items)
          }
        });
        twochart.interval().position('type*total').color('type', val => {
          if (val === '接单') {
            return 'pink';
          } else if (val == '发货') {
            return '#ff0000'
          } else if (val == '投料') {
            return '#000'
          } else if (val == '入库') {
            return 'green'
          }
        });;
        twochart.render();
        return twochart;
      }
    }
  },
  bindenddate(e) {
    let date = e.detail.value;
    if (new Date(date) < new Date(this.data.startdate) || new Date(date) > new Date()) {
      wx.showToast({
        title: '结束日期不能小于开始日期或大于当前日期',
        icon: 'none'
      })
      return
    }
    this.setData({
      enddate: date,
    })
    this.getdata();
  },
  bindstartdate(e) {
    let date = e.detail.value;
    if (new Date(date) > new Date(this.data.enddate)) {
      wx.showToast({
        title: '开始日期不能大于结束日期',
        icon: 'none'
      })
      return
    }
    this.setData({
      startdate: date,
    })
    this.getdata();
  },

  onLoad: function(options) {
    this.init()
  },
  init() {
    let end = format(new Date(), 'yyyy-MM-dd');
    let start = end.split('-');
    start = `${start[0]}-${start[1]}-01`
    console.log('adad', start)
    this.setData({
      enddate: end,
      startdate: start,
    })
    this.getdata()
  },

  getdata() {
    chartdata = [];
    twochartdata = [];
    wx.showLoading({
      title: '加载中...',
    })
    const that = this
    fromone.getFromOne(this.data.startdate, this.data.enddate).then(res => {
      if (res.code == '100') {
        wx.hideLoading();
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        return
      }
      let clonelistdata = [];
      let clonetotal = null;
      res.result.forEach((item, index, list) => {
        if (index != list.length - 1) {
          clonelistdata.push({
            transdate: item.transdate,
            orderQty: formatmoney(item.orderQty, 1, '.', ','),
            SendQty: formatmoney(item.SendQty, 1, '.', ','),
            stupQty: formatmoney(item.stupQty, 1, '.', ','),
            prodQty: formatmoney(item.prodQty, 1, '.', ',')
          })
        } else {
          clonetotal = {
            orderQty: formatmoney(item.orderQty, 1, '.', ','),
            SendQty: formatmoney(item.SendQty, 1, '.', ','),
            stupQty: formatmoney(item.stupQty, 1, '.', ','),
            prodQty: formatmoney(item.prodQty, 1, '.', ',')
          }
        }
        item.transdate = item.transdate
        item.orderQty = item.orderQty || 0
        item.SendQty = item.SendQty || 0
        item.stupQty = item.stupQty || 0
        item.prodQty = item.prodQty || 0
      })
      let len = res.result.length
      this.setData({
        listdata: clonelistdata,
        total: clonetotal
      })
      wx.hideLoading();
      const list = res.result.slice(0, len - 1);
      chartdata = [];
      for (let index in list) {
        chartdata.push({
          year: list[index].transdate,
          type: '接单',
          value: list[index].orderQty
        })
        chartdata.push({
          year: list[index].transdate,
          type: '发货',
          value: list[index].SendQty
        })
        chartdata.push({
          year: list[index].transdate,
          type: '投料',
          value: list[index].stupQty
        })
        chartdata.push({
          year: list[index].transdate,
          type: '入库',
          value: list[index].prodQty
        })
      }
      chartdata.forEach(item => {
        // console.log('11',item)
        if (originDates.indexOf(item.year) == -1) {
          originDates.push(item.year)
        }
        // originDates.push(item.year);
      })
      console.log('日期', originDates);

      twochartdata.push({
        type: "接单",
        total: res.result.slice(len - 1, len)[0].orderQty
      }, {
        type: "发货",
        total: res.result.slice(len - 1, len)[0].SendQty
      }, {
        type: "投料",
        total: res.result.slice(len - 1, len)[0].stupQty
      }, {
        type: "入库",
        total: res.result.slice(len - 1, len)[0].prodQty
      })
      chart.source(chartdata, {
        year: {
          type: 'timeCat',
          tickCount: 3,
          rangs: [0, 1],
          mask: 'YYYY-MM-DD',
          values: originDates.slice(0, 5)
          // ticks: originDates
        },
        value: {
          tickCount: 6
        }
      });
      // chart.repaint(); // 更新图表！
      chart.changeData(chartdata)
      twochart.source(twochartdata, {
        total: {
          tickCount: 5
        }
      });
      twochart.changeData(twochartdata)
      console.log('柱状图', twochartdata)
      console.log('图标数据2', chartdata)
    })
  },
  // onPageScroll(e) {
  //   if (e.scrollTop > 99) {
  //     this.setData({
  //       isShow: false
  //     })
  //   } else if (e.scrollTop < 100) {
  //     this.setData({
  //       isShow: true
  //     })
  //   }
  //   // console.log(e, this.data.isShow);
  // },
  onReady() {
    setTimeout(() => {

    }, 3000)
  },

})