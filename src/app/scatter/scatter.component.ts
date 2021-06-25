import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/services/app-service.service';
import {
  GraphsServiceService,
  Record,
} from 'src/services/graphs-service.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css'],
})
export class ScatterComponent implements OnInit {
  constructor(
    private service: GraphsServiceService,
    private appService: AppServiceService
  ) {}

  ngOnInit(): void {
    this.attributes = ['tecu', 's4', 'sigmaphi'];
    this.service
      .getStations()
      .subscribe((stations) => (this.stations = stations));
  }

  isMeridian: boolean = false;
  hidden: boolean = true;
  selectedAttribute: string;
  azimuthStart: string;
  azimuthEnd: string;
  elevationStart: string;
  elevationEnd: string;
  dateRange: Date;
  timeStart: Date;
  timeEnd: Date;
  records: Record[];
  option: any;
  data_pairs: { [key: string]: any[][] };
  attributes: string[];
  stations: string[];

  formSubmit() {
    this.dateRange[0].setHours(this.timeStart.getHours(), 0, 0);
    this.dateRange[1].setHours(this.timeEnd.getHours(), 0, 0);

    const start = this.dateRange[0];
    const end = this.dateRange[1];

    if (this.azimuthStart == undefined) {
      this.azimuthStart = '0';
    }
    if (this.azimuthEnd == undefined) {
      this.azimuthEnd = '360';
    }
    if (this.elevationStart == undefined) {
      this.elevationStart = '0';
    }
    if (this.elevationEnd == undefined) {
      this.elevationEnd = '90';
    }

    this.service
      .getScatter(
        this.selectedAttribute,
        this.azimuthStart,
        this.azimuthEnd,
        this.elevationStart,
        this.elevationEnd,
        start,
        end
      )
      .subscribe((records) => {
        this.records = records;
        this.hidden = false;
        this.showScatter(this.records, start, end, this.selectedAttribute);
      });
  }

  editData(records: Record[], attribute: string) {
    records.sort(function (a, b) {
      return +new Date(a.timeStart) - +new Date(b.timeStart);
    });

    this.records = records;

    this.data_pairs = {};

    this.records.forEach((rec) => {
      if (rec.scintillation) {
        if (!this.data_pairs['scintillation']) {
          this.data_pairs['scintillation'] = [];
        }
        this.data_pairs['scintillation'].push([rec.timeStart, rec[attribute], rec.station]);
      } else {
        if (!this.data_pairs[rec.station]) {
          this.data_pairs[rec.station] = [];
        }
        this.data_pairs[rec.station].push([rec.timeStart, rec[attribute]]);
      }
    });
  }

  download() {
    this.appService.downloadFile(
      this.records,
      this.selectedAttribute,
      'ionosphere_data'
    );
  }

  getSeries() {
    let series = [];
    this.stations.forEach((station) => {
      series.push({
        name: station,
        data: this.data_pairs[station],
        type: 'scatter',
      });
    });
    series.push({
      name: 'scintillation',
      data: this.data_pairs['scintillation'],
      station: 'sss',
      type: 'scatter',
      symbol: 'triangle',
      itemStyle: {
        color: 'red',
      },
    });
    return series;
  }

  getLegend() {
    let legend = {
      right: '10%',
      top: '10%',
      data: [...this.stations, 'scintillation'],
    };
    return legend;
  }

  showScatter(records: Record[], start: Date, end: Date, attribute: string) {
    this.editData(records, attribute);
    const title: string =
      'CHAIN- Ionosphere monitoring system, ' +
      [start.getFullYear(), start.getMonth() + 1, start.getDate()].join('-') +
      ' - ' +
      [end.getFullYear(), end.getMonth() + 1, end.getDate()].join('-');

    this.option = {
      title: {
        left: 'center',
        text: title,
      },
      legend: this.getLegend(),
      tooltip: {
        formatter: (params) => {
        var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        return colorSpan(params.color) + 'station: ' + `${params.data[2] ? '<b>' + params.data[2] + '</b>' : ''}` + ' <b>' + params.seriesName + '</b>'
        }
    },
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: function (value) {
            let label;
            value = new Date(value);
            label = [
              value.getFullYear(),
              value.getMonth() + 1,
              value.getDate(),
            ].join('-');
            return label;
          },
        },
        name: 'Time(UTC)',
        nameLocation: 'middle',
        nameGap: 30,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        name: attribute,
        nameLocation: 'middle',
        nameGap: 30,
      },
      series: this.getSeries(),
    };
  }
}
