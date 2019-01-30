import F2 from '../../f2-canvas/lib/f2'
import chartdata from './data.js'
let chart = null
Page({
  data: {
    opts: {
      onInit: function(canvas, width, height) {
        let originDates = []//x轴数据
        chartdata.forEach(item => {
          
          if (originDates.indexOf(item.year) == -1) {
            originDates.push(item.year);
          }
        })
        console.log('日期',originDates);
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
            values: originDates.slice(0,20)
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
  },
  onReady() {
    setTimeout(() => {

    }, 3000)
  },
})