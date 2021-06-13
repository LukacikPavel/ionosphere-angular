import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { startOf } from 'ngx-bootstrap/chronos';
import {
  HeatmapServiceService,
  Record,
} from 'src/services/heatmap-service.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css'],
})
export class ScatterComponent implements OnInit {
  constructor(private service: HeatmapServiceService) {}

  ngOnInit(): void {}

  attribute: string;
  dateRange: Date;
  timeStart: Date;
  timeEnd: Date;
  records: Record[];
  option: any;
  data: number[];
  dates: Date[];

  // renderItem(params, api) {
  //   var values = [(api.value(0) / 10 - 8) * -1, api.value(1) / 30];
  //   var coord = api.coord(values);
  //   var size = api.size([1, 1], values);
  //   return {
  //     type: 'sector',
  //     shape: {
  //       cx: params.coordSys.cx,
  //       cy: params.coordSys.cy,
  //       r0: coord[2] - size[0] / 2,
  //       r: coord[2] + size[0] / 2,
  //       startAngle: -coord[3],
  //       endAngle: -(coord[3] - size[1]),
  //     },
  //     style: api.style({
  //       fill: api.visual('color'),
  //     }),
  //   };
  // }

  formSubmit() {
    this.dateRange[0].setHours(
      this.timeStart.getHours(),
      this.timeStart.getMinutes(),
      this.timeStart.getSeconds()
    );
    this.dateRange[1].setHours(
      this.timeEnd.getHours(),
      this.timeEnd.getMinutes(),
      this.timeEnd.getSeconds()
    );
    const start = this.dateRange[0];
    const end = this.dateRange[1];


    this.service
      .getScatter2(this.attribute, start, end)
      .subscribe((records) => {
        this.records = records;
        // console.log(this.records);
      });

    // var data = this.createData(this.records, this.attribute);

    this.showScatter(this.records, start, end, this.attribute);
    // this.editData(this.records, this.attribute )
  }

  editData(records: Record[], attribute: string) {
    records.sort(function (a, b) {
      return +new Date(a.timeStart) - +new Date(b.timeStart);
    });
    

    let data = [];
    let dates = [];
    records.forEach((rec) => {
      data.push(rec[attribute]);
      dates.push(rec.timeStart);
    });

    this.data = data;
    this.dates = dates;
  }

  showScatter(records: Record[], start: Date, end: Date, attribute: string) {
    this.editData(records, attribute);
    const title: string =
      'AMON-ES- Ionosphere monitoring system, ' + [start.getFullYear(), start.getMonth() + 1, start.getDate()].join('-') + ' - ' + [end.getFullYear(), end.getMonth() + 1, end.getDate()].join('-');


    this.option = {
      title: {
        left: 'center',
        text: title,
      },
      xAxis: {
        type: 'category',
        data: this.dates,
        axisLabel : {
          formatter: (function(value){
            let label;
            value = new Date(value);
            label = [value.getFullYear(), value.getMonth() + 1, value.getDate()].join('-');
            return label;
          })
        },
        name: 'Time(UTC)',
        nameLocation: 'middle',
        nameGap: 50
      },
      yAxis: {
        type: 'value',
        axisLabel : {
          formatter: '{value}'
        },
        name: attribute,
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          symbolSize: 10,
          data: this.data,
          // [
          //   [10.0, 8.04],
          //   [8.07, 6.95],
          //   [13.0, 7.58],
          //   [9.05, 8.81],
          //   [11.0, 8.33],
          //   [14.0, 7.66],
          //   [13.4, 6.81],
          //   [10.0, 6.33],
          //   [14.0, 8.96],
          //   [12.5, 6.82],
          //   [9.15, 7.2],
          //   [11.5, 7.2],
          //   [3.03, 4.23],
          //   [12.2, 7.83],
          //   [2.02, 4.47],
          //   [1.05, 3.33],
          //   [4.05, 4.96],
          //   [6.03, 7.24],
          //   [12.0, 6.26],
          //   [12.0, 8.84],
          //   [7.08, 5.82],
          //   [5.02, 5.68],
          // ],
          type: 'scatter',
          itemStyle: {
            color: function(param) {
              // Write your logic.
              // for example: in case your data is structured as an array of arrays, you can paint it red if the first value is lower than 10:
              if (attribute == 's4'){
                if (param.data > 0.07) {
                  return 'red'
                }
                else return 'green'
              }

              if (attribute == 'sigmaphi'){
                if (param.data > 0.1) return 'red'
                else return 'green'
              }
            }
          },
        },
      ],
    };
  }
}
