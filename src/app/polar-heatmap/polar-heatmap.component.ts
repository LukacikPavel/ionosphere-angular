import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polar-heatmap',
  templateUrl: './polar-heatmap.component.html',
  styleUrls: ['./polar-heatmap.component.css'],
})
export class PolarHeatmapComponent implements OnInit {
  options: any;

  constructor() {}

  renderItem(params, api) {
    var values = [api.value(0), api.value(1)];
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

  renderItem2(params, api) {
    var values = [(api.value(0) - 10) / 10, api.value(1) / 30];
    console.log(values);
    var coord = api.coord(values);
    console.log(coord);
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

  ngOnInit(): void {
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
    var elevation = ['80°', '70°', '60°', '50°', '40°', '30°', '20°', '10°'];

    var data = [
      [0, 0, 5],
      [0, 1, 1],
      [0, 2, 0],
      [0, 3, 0],
      [0, 4, 0],
      [0, 5, 0],
      [0, 6, 0],
      [0, 7, 0],
      [0, 8, 0],
      [0, 9, 0],
      [0, 10, 0],
      [0, 11, 2],
      [0, 12, 4],
      [1, 0, 7],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 4, 0],
      [1, 5, 0],
      [1, 6, 0],
      [1, 7, 0],
      [1, 8, 0],
      [1, 9, 0],
      [1, 10, 5],
      [1, 11, 2],
      [1, 12, 2],
      [2, 0, 1],
      [2, 1, 1],
      [2, 2, 0],
      [2, 3, 0],
      [2, 4, 0],
      [2, 5, 0],
      [2, 6, 0],
      [2, 7, 0],
      [2, 8, 0],
      [2, 9, 0],
      [2, 10, 3],
      [2, 11, 2],
      [2, 12, 1],
      [3, 0, 7],
      [3, 1, 3],
      [3, 2, 0],
      [3, 3, 0],
      [3, 4, 0],
      [3, 5, 0],
      [3, 6, 0],
      [3, 7, 14],
      [3, 8, 1],
      [3, 9, 0],
      [3, 10, 5],
      [3, 11, 4],
      [3, 12, 7],
      [4, 0, 1],
      [4, 1, 3],
      [4, 2, 0],
      [4, 3, 0],
      [4, 4, 5],
      [4, 5, 1],
      [4, 6, 0],
      [4, 7, 0],
      [4, 8, 0],
      [4, 9, 2],
      [4, 10, 4],
      [4, 11, 4],
      [4, 12, 2],
      [5, 0, 2],
      [5, 1, 1],
      [5, 2, 0],
      [5, 3, 3],
      [5, 4, 0],
      [5, 5, 0],
      [5, 6, 0],
      [5, 7, 0],
      [5, 8, 2],
      [5, 9, 0],
      [5, 10, 4],
      [5, 11, 1],
      [5, 12, 5],
      [6, 0, 1],
      [6, 1, 0],
      [6, 2, 0],
      [6, 3, 14],
      [6, 4, 0],
      [6, 5, 0],
      [6, 6, 0],
      [6, 7, 0],
      [6, 8, 0],
      [6, 9, 0],
      [6, 10, 1],
      [6, 11, 0],
      [6, 12, 2],
      [7, 0, 1],
      [7, 1, 0],
      [7, 2, 0],
      [7, 3, 0],
      [7, 4, 0],
      [7, 5, 0],
      [7, 6, 0],
      [7, 7, 14],
      [7, 8, 0],
      [7, 9, 0],
      [7, 10, 1],
      [7, 11, 0],
      [7, 12, 2],
    ];
    var data2 = [ // [elevation, azimuth, value]
      [10, 30, 2],
      [10, 60, 0],
      [10, 90, 0],
      [10, 120, 0],
      [10, 150, 0],
      [10, 180, 0],
      [10, 210, 14],
      [10, 240, 0],
      [10, 270, 0],
      [10, 300, 0],
      [10, 330, 2],
      [10, 360, 2],
      [20, 0, 5],
      [20, 30, 2],
      [20, 60, 0],
      [20, 90, 0],
      [20, 120, 0],
      [20, 150, 0],
      [20, 180, 0],
      [20, 210, 0],
      [20, 240, 0],
      [20, 270, 0],
      [20, 300, 0],
      [20, 330, 2],
      [20, 360, 2],
      [30, 0, 5],
      [30, 30, 2],
      [30, 60, 0],
      [30, 90, 0],
      [30, 120, 0],
      [30, 150, 12],
      [30, 180, 0],
      [30, 210, 0],
      [30, 240, 0],
      [30, 270, 0],
      [30, 300, 0],
      [30, 330, 2],
      [30, 360, 2],
      [40, 0, 5],
      [40, 30, 2],
      [40, 60, 0],
      [40, 90, 0],
      [40, 120, 0],
      [40, 150, 0],
      [40, 180, 0],
      [40, 210, 10],
      [40, 240, 0],
      [40, 270, 0],
      [40, 300, 0],
      [40, 330, 2],
      [40, 360, 2],
      [50, 0, 5],
      [50, 30, 2],
      [50, 60, 0],
      [50, 90, 0],
      [50, 120, 0],
      [50, 150, 5],
      [50, 180, 0],
      [50, 210, 0],
      [50, 240, 0],
      [50, 270, 0],
      [50, 300, 0],
      [50, 330, 2],
      [50, 360, 2],
      [60, 0, 5],
      [60, 30, 2],
      [60, 60, 0],
      [60, 90, 0],
      [60, 120, 0],
      [60, 150, 0],
      [60, 180, 0],
      [60, 210, 0],
      [60, 240, 0],
      [60, 270, 0],
      [60, 300, 0],
      [60, 330, 2],
      [60, 360, 2],
      [70, 0, 5],
      [70, 30, 2],
      [70, 60, 0],
      [70, 90, 0],
      [70, 120, 0],
      [70, 150, 0],
      [70, 180, 0],
      [70, 210, 0],
      [70, 240, 0],
      [70, 270, 0],
      [70, 300, 0],
      [70, 330, 2],
      [70, 360, 2],
      [80, 0, 5],
      [80, 30, 2],
      [80, 60, 0],
      [80, 90, 0],
      [80, 120, 0],
      [80, 150, 0],
      [80, 180, 0],
      [80, 210, 0],
      [80, 240, 0],
      [80, 270, 0],
      [80, 300, 0],
      [80, 330, 2],
      [80, 360, 2],
    ];

    var maxValue = 14;
    this.options = {
      legend: {
        data: ['TEC at current time [TECU]'],
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
          color: ['#ffffff', '#009000', '#DD2000'],
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
          name: 'TEC at current time [TECU]',
          type: 'custom',
          coordinateSystem: 'polar',
          itemStyle: {
            color: '#DD2000',
          },
          renderItem: this.renderItem2,
          data: data2,
        },
      ],
    };
  }
}