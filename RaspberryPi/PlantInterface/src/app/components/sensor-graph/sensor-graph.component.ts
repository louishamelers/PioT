import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {Observable, Subscription} from 'rxjs';
import * as io from 'socket.io-client';
import {DataService} from '../../services/data.service';

const CHART_OPTIONS: ChartOptions = {
  legend: {
    display: false
  },
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      display: false
    }]
  },
  aspectRatio: 3
};

@Component({
  selector: 'app-sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.scss']
})
export class SensorGraphComponent {
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
  public chartData: ChartDataSets[] = [
    {
      data: [],
      fill: false
    },
    {
      data: [],
      fill: false
    },
    {
      data: [],
      fill: false
    },
    {
      data: [],
      fill: false
    },
  ];
  public chartLabels = [];
  public chartOptions = CHART_OPTIONS;
  public chartColors: Color[] = [
    {borderColor: '#0B3954'},
    {borderColor: '#BFD7EA'},
    {borderColor: '#FF6663'},
    {borderColor: '#E0FF4F'},
  ];

  constructor(private dataService: DataService) {
    dataService.sensorData.subscribe(data => {
      // set chartData
      this.chartData[0].data = data.humidity;
      this.chartData[1].data = data.light;
      this.chartData[2].data = data.soilMoisture;
      this.chartData[3].data = data.temperature;

      // set chart labels
      this.chartLabels = data.time;
    });
  }
}
