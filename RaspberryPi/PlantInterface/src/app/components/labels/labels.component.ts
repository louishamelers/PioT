import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labels: Observable<{ name: string; value: number }[]>;

  constructor(public dataService: DataService) {
    this.labels = dataService.sensorData.pipe(
      map(data => {
        return [
          {name: 'humidity', value: data.humidity[data.humidity.length - 1]},
          {name: 'light', value: data.light[data.light.length - 1]},
          {name: 'soil-moisture', value: data.soilMoisture[data.soilMoisture.length - 1]},
          {name: 'temperature', value: data.temperature[data.temperature.length - 1]},
        ];
      })
    );
  }

  ngOnInit(): void {
  }

}
