import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-basic-graph',
  templateUrl: './basic-graph.component.html',
  styleUrls: ['./basic-graph.component.scss']
})
export class BasicGraphComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40]}
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    legend: {
      display: false
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          // gridLines: {
          //   color: 'rgba(255,0,0,0.3)',
          // },
          // ticks: {
          //   fontColor: 'red',
          // }
        }
      ]
    },
    annotation: {
      // annotations: [
      //   {
      //     type: 'line',
      //     mode: 'vertical',
      //     scaleID: 'x-axis-0',
      //     value: 'March',
      //     borderColor: 'orange',
      //     borderWidth: 2,
      //     label: {
      //       enabled: true,
      //       fontColor: 'orange',
      //       content: 'LineAnno'
      //     }
      //   },
      // ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {
  }

  // public randomize(): void {
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       this.lineChartData[i].data[j] = this.generateNumber(i);
  //     }
  //   }
  //   this.chart.update();
  // }
  //
  // private generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }
  //
  // // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
  //
  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
  //
  // public hideOne(): void {
  //   const isHidden = this.chart.isDatasetHidden(1);
  //   this.chart.hideDataset(1, !isHidden);
  // }
  //
  // public pushOne(): void {
  //   this.lineChartData.forEach((x, i) => {
  //     const num = this.generateNumber(i);
  //     const data: number[] = x.data as number[];
  //     data.push(num);
  //   });
  //   this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  // }
  //
  // public changeColor(): void {
  //   this.lineChartColors[2].borderColor = 'green';
  //   this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  // }
  //
  // public changeLabel(): void {
  //   this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  // }
}
