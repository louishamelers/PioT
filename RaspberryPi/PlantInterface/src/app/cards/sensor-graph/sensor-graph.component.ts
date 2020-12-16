import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.scss']
})
export class SensorGraphComponent implements OnInit, OnDestroy {
  public data: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40]}
  ];
  public labels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public options: (ChartOptions & { annotation: any }) = {
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
  public colors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public type: ChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected = false;
  // @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private mqttService: MqttService) { }

  ngOnInit(): void {
    // this.subscribeNewTopic();
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


  subscribeNewTopic(): void {
    console.log('inside subscribe new topic');
    this.subscription = this.mqttService.observe('iot-plant-solution/devices/lopy-tom/up').subscribe((message: IMqttMessage) => {
      // this.msg = message;
      console.log('msg: ', message);
      // this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    });
    // this.logMsg('subscribed to topic: ' + this.topicname);
  }

  // sendmsg(): void {
  //   // use unsafe publish for non-ssl websockets
  //   this.mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true });
  //   this.msg = '';
  // }

  logMsg(message): void {
    // this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    // this.msglog.nativeElement.innerHTML = '';
  }

}
