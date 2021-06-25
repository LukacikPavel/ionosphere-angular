import { Component, OnInit } from '@angular/core';
import { Record } from 'src/services/graphs-service.service';
import { GraphsServiceService } from 'src/services/graphs-service.service';

@Component({
  selector: 'app-polar-heatmap',
  templateUrl: './polar-heatmap.component.html',
  styleUrls: ['./polar-heatmap.component.css'],
})
export class PolarHeatmapComponent implements OnInit {
  isMeridian: boolean = false;
  selectedStation: string;
  selectedAttribute: string;
  dateRange: Date;
  timeStart: Date;
  timeEnd: Date;
  records: Record[];
  options: any;
  stations: string[];
  attributes: string[];

  constructor(private service: GraphsServiceService) {}

  ngOnInit(): void {
    this.service.getStations().subscribe((stations) => {
      this.stations = stations;
    });

    this.attributes = ['tecu', 's4', 'sigmaphi'];
  }

  formSubmit() {
    this.dateRange[0].setHours(this.timeStart.getHours(), 0, 0);
    this.dateRange[1].setHours(this.timeEnd.getHours(), 0, 0);
    const start = this.dateRange[0];
    const end = this.dateRange[1];

    this.service
      .getHeatmap(this.selectedStation, this.selectedAttribute, start, end)
      .subscribe((records) => {
        this.records = records;
        this.showHeatMap(this.records, this.selectedAttribute);
      });
  }

  renderItem(params, api) {
    var values = [(api.value(0) / 10 - 8) * -1, api.value(1) / 30 + 1];
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
      return [element.elevationStart, element.azimuthStart, element[attribute]];
    });
  }

  createData(dataFromBackend, attribute) {
    var result = [];
    var data = this.convertData(dataFromBackend, attribute);
    data.forEach((element) => {
      result.push(element);
    });
    return result;
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

    var data = this.createData(dataFromBackend, attrib);

    var maxValue = 1; 
    if (attrib == 'tecu'){
      maxValue = 88.31;
    } else if (attrib == 's4'){
      maxValue = 0.76;
    } else {
      maxValue = 3.61;
    };

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
          color: ['#00ff00', '#FCFF00','#FCFF00','#ff0000','#ff0000','#ff0000', '#ff0000'],
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
}
