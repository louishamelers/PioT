import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject, Observable} from 'rxjs';

export interface SensorData {
  time: string[];
  humidity: number[];
  light: number[];
  soilMoisture: number[];
  temperature: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly bufferSize = 10;
  private data: SensorData = {
    time: new Array(this.bufferSize).fill('--:--'),
    humidity: new Array(this.bufferSize).fill(null),
    light: new Array(this.bufferSize).fill(null),
    soilMoisture: new Array(this.bufferSize).fill(null),
    temperature: new Array(this.bufferSize).fill(null)
  };
  private readonly dataSubject: BehaviorSubject<SensorData> = new BehaviorSubject<SensorData>(this.data);

  get sensorData(): Observable<SensorData> {
    return this.dataSubject.asObservable();
  }

  constructor() {
    // todo config file
    const socket = io.io('192.168.1.100:3000');

    socket.on('sensor-data', rawData => {
      // add data to rawData
      const timeFormat = new Date(rawData.metadata.time);
      this.data.time.push(`${timeFormat.getUTCHours()}:${timeFormat.getMinutes()}`);
      this.data.humidity.push(rawData.payload_fields.humidity);
      this.data.light.push(rawData.payload_fields.light);
      this.data.soilMoisture.push(rawData.payload_fields.soilMoisture);
      this.data.temperature.push(rawData.payload_fields.temperature);

      // this.data.humidity.push(Math.random());
      // this.data.light.push(Math.random());
      // this.data.soilMoisture.push(Math.random());
      // this.data.temperature.push(Math.random());

      // trim it
      this.data.time = this.data.time.slice(1, this.bufferSize + 1);
      this.data.humidity = this.data.humidity.slice(1, this.bufferSize + 1);
      this.data.light = this.data.light.slice(1, this.bufferSize + 1);
      this.data.soilMoisture = this.data.soilMoisture.slice(1, this.bufferSize + 1);
      this.data.temperature = this.data.temperature.slice(1, this.bufferSize + 1);

      // push to subscriber
      this.dataSubject.next(this.data);
    });

  }
}
