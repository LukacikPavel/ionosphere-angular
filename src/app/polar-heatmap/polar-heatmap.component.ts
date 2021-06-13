import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Record } from 'src/services/heatmap-service.service';
import { HeatmapServiceService } from 'src/services/heatmap-service.service';

@Component({
  selector: 'app-polar-heatmap',
  templateUrl: './polar-heatmap.component.html',
  styleUrls: ['./polar-heatmap.component.css'],
})
export class PolarHeatmapComponent implements OnInit {

  station: string;
  attribute: string;
  dateRange: Date;
  timeStart: Date;
  timeEnd: Date;
  records: Record[];
  options: any;

  constructor(
    private service: HeatmapServiceService
  ) {}

  

  formSubmit() {
    this.dateRange[0].setHours(this.timeStart.getHours(), this.timeStart.getMinutes(), this.timeStart.getSeconds());
    this.dateRange[1].setHours(this.timeEnd.getHours(), this.timeEnd.getMinutes(), this.timeEnd.getSeconds());
    const start = this.dateRange[0];
    const end = this.dateRange[1];

    // console.log("start", start);
    // console.log("end", end);

    this.service.getHeatmap2(this.station, this.attribute, start, end).subscribe(
      records => {
        this.records = records;
        // console.log(this.records);
        this.showHeatMap(this.records,this.attribute);
      }
    )    
    
    // var data = this.createData(this.records, this.attribute);

  }

  renderItem(params, api) {
    var values = [(api.value(0) / 10 - 8) * -1, api.value(1) / 30];
    var coord = api.coord(values);
    var size = api.size([1, 1], values);
    return {
      type: 'sector',
      shape: {
        cx: params.coordSys.cx,
        cy: params.coordSys.cy,
        r0: coord[2] - size[0] / 2,
        r: coord[2] + size[0] / 2,
        startAngle: -coord[3],
        endAngle: -(coord[3] - size[1]),
      },
      style: api.style({
        fill: api.visual('color'),
      }),
    };
  }

  convertData(dataFromBackend, attribute) {
    return dataFromBackend.map((element) => {
      // console.log("element", element);
      return [element.elevationStart, element.azimuthStart, element[attribute]];
    });
  }

  createEmptyData() {
    var result = [];
    for (var i = 0; i < 90; i += 10) {
      for (var j = 0; j < 360; j += 30) {
        result.push([i, j, 0]);
      }
    }
    return result;
  }

  createData(dataFromBackend, attribute) {
    var empty = this.createEmptyData();
    var data = this.convertData(dataFromBackend, attribute);
    // console.log("Data v create data",data);
    data.forEach((element) => {
      empty.push(element);
    });
    return empty;
  }

  showHeatMap(dataFromBackend: Array<Record>, attrib: string) {
    var azimuth = [
      'N',
      '30°',
      '60°',
      'E',
      '120°',
      '150°',
      'S',
      '210°',
      '240°',
      'W',
      '300°',
      '330°',
    ];
    var elevation = [
      '80°',
      '70°',
      '60°',
      '50°',
      '40°',
      '30°',
      '20°',
      '10°',
      '0°',
    ];

    // const dataFromBackend = [
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 90,
    //     azimuthEnd: 120,
    //     elevationStart: 40,
    //     elevationEnd: 50,
    //     s4: 0.035,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 210,
    //     azimuthEnd: 240,
    //     elevationStart: 40,
    //     elevationEnd: 50,
    //     s4: 0.04,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 210,
    //     azimuthEnd: 240,
    //     elevationStart: 30,
    //     elevationEnd: 40,
    //     s4: 0.035,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 180,
    //     azimuthEnd: 210,
    //     elevationStart: 30,
    //     elevationEnd: 40,
    //     s4: 0.04,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 180,
    //     azimuthEnd: 210,
    //     elevationStart: 40,
    //     elevationEnd: 50,
    //     s4: 0.03,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 180,
    //     azimuthEnd: 210,
    //     elevationStart: 50,
    //     elevationEnd: 60,
    //     s4: 0.03,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 150,
    //     azimuthEnd: 180,
    //     elevationStart: 40,
    //     elevationEnd: 50,
    //     s4: 0.04,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 120,
    //     azimuthEnd: 150,
    //     elevationStart: 30,
    //     elevationEnd: 40,
    //     s4: 0.075,
    //   },
    //   {
    //     station: 'gri',
    //     timeStart: '2015-09-14T12:00:00',
    //     timeEnd: '2015-09-14T14:00:00',
    //     azimuthStart: 120,
    //     azimuthEnd: 150,
    //     elevationStart: 40,
    //     elevationEnd: 50,
    //     s4: 0.07,
    //   },
    // ];

    var data = this.createData(dataFromBackend, attrib);

    var maxValue = data.reduce(function (max, item) {
      return Math.max(max, item[2]);
    }, -Infinity);

    this.options = {
      legend: {
        data: [attrib],
      },
      polar: {},
      tooltip: {},
      visualMap: {
        type: 'continuous',
        min: 0,
        max: maxValue,
        top: 'middle',
        right: '30%',
        itemHeight: 300,
        dimension: 2,
        calculable: true,
        inRange: {
          color: ['#ffffff', '#FCFF00', '#009000', '#DD2000'],
        },
      },
      angleAxis: {
        type: 'category',
        data: azimuth,
        boundaryGap: false,
        clockwise: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ff00ff',
            type: 'dashed',
          },
        },
        axisLine: {
          show: true,
        },
      },
      radiusAxis: {
        type: 'category',
        data: elevation,
        z: 100,
      },
      series: [
        {
          name: attrib,
          type: 'custom',
          coordinateSystem: 'polar',
          itemStyle: {
            color: '#DD2000',
          },
          renderItem: this.renderItem,
          data: data,
        },
      ],
    };
  }

  ngOnInit(): void {}
}
