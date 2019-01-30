// pages/test/index.js
import F2 from '../../f2-canvas/lib/f2'
import chartdata from './data.js'
let chart = null;
var dates = [];

Page({
  data: {
    opts: {
      onInit: function(canvas, width, height) {
        chartdata.forEach(function(obj) {
          dates.push(obj.reportDate);
        });
        let len = dates.length;
        len = len -30
        chart = new F2.Chart({
          el: canvas,
          width,
          height,
          animate: false,
        });
        chart.source(chartdata, {
          reportDate: {
            type: 'timeCat',
            tickCount: 3,
            range: [0, 1],
            mask: 'YYYY-MM-DD',
            values: dates.slice(0, 90)
          },
          rate: {
            tickCount: 5
          },
          name: {
            values: ['沪深300', '同类平均', '本基金']
          }
        });
        chart.axis('reportDate', {
          line: null,
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
            if (arr[0] === '2018') {
              cfg.text = arr[1] + '-' + arr[2];
            }
            return cfg;
          }
        });
        chart.axis('rate', {
          label: function label(text) {
            text = text * 1;
            var cfg = {
              text: text.toFixed(2) + '%'
            };
            if (text > 0) {
              cfg.text = '+' + cfg.text;
            } else if (text === 0) {
              cfg.fill = '#000';
              cfg.fontWeight = 'bold';
            }
            return cfg;
          }
       
        });
        // chart.legend(false); // 不使用默认图例
        chart.tooltip({
          crosshairsStyle: {
            stroke: '#CAD7EF'
          },
        });
        chart.animate({
          'axis-grid': false
        });
        chart.line().position('reportDate*rate').color('name', function(val) {
          
        })
        chart.interaction('pan');
        // chart.interaction('pinch', {
        //   maxScale: dates / 50
        // });
     

        // 添加进度条
        chart.scrollBar({
          mode: 'x',
          xStyle: {
            offsetY: -5
          }
        });
        chart.render();
        return chart;
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})