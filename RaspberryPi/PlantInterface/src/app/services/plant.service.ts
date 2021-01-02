import { Injectable } from '@angular/core';
import {DataService, SensorData} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {combineLatest} from "rxjs";

// static plant types & settings
export interface PlantProperties {
  plantName: string,
  prefHumidity: number,
  prefLight: number,
  prefSoilMoisture: number,
  prefTemperature: number
}
export const PLANT_PROPERTIES: PlantProperties[] = [
  {
    plantName: 'Cactus',
    prefHumidity: 0.8,
    prefLight: 0.6,
    prefSoilMoisture: 0.6,
    prefTemperature: 0.7
  },
  {
    plantName: 'Fern',
    prefHumidity: 0.8,
    prefLight: 0.6,
    prefSoilMoisture: 0.6,
    prefTemperature: 0.7
  },
  {
    plantName: 'RubberPlant',
    prefHumidity: 0.8,
    prefLight: 0.6,
    prefSoilMoisture: 0.6,
    prefTemperature: 0.7
  }
];

export interface PlantStatus {
  status: string,
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public readonly healthyStatus: PlantStatus = {status: 'healthy', message: ''}
  private readonly healthSubject: BehaviorSubject<PlantStatus> = new BehaviorSubject<PlantStatus>(this.healthyStatus);
  private readonly plantSubject: BehaviorSubject<PlantProperties> = new BehaviorSubject<PlantProperties>(PLANT_PROPERTIES[0])

  public get getPlants(): PlantProperties[] {
    return PLANT_PROPERTIES;
  }

  public get plantStatus(): Observable<PlantStatus> {
    return this.healthSubject.asObservable();
  }

  public set plantPropertiesRaw(plant: PlantProperties) {
    this.plantSubject.next(plant);
  }

  public get plantProperties(): Observable<PlantProperties> {
    return this.plantSubject.asObservable();
  }

  constructor(private dataService: DataService) {
    combineLatest([
      dataService.sensorData,
      this.plantSubject
    ]).subscribe(([data, plant]: [SensorData, PlantProperties]) => {
      const margin = .2;

      if (data.humidity[9] > plant.prefHumidity + margin) {
        const status = {
          status: 'moist',
          message: 'Make the air dryer.'
        }
        this.healthSubject.next(status);
      } else if (data.humidity[9] < plant.prefHumidity - margin) {
        const status = {
          status: 'dry',
          message: 'Make the air more moist.'
        }
        this.healthSubject.next(status);
      } else if (data.light[9] > plant.prefLight + margin) {
        const status = {
          status: 'bright',
          message: 'Close the curtains.'
        }
        this.healthSubject.next(status);
      } else if (data.light[9] < plant.prefLight - margin) {
        const status = {
          status: 'dark',
          message: 'Open the curtains'
        }
        this.healthSubject.next(status);
      } else if (data.soilMoisture[9] > plant.prefSoilMoisture + margin) {
        const status = {
          status: 'moist',
          message: 'Don\'t give your plant water.'
        }
        this.healthSubject.next(status);
      } else if (data.soilMoisture[9] < plant.prefSoilMoisture - margin) {
        const status = {
          status: 'thirsty',
          message: 'Give your plant some water.'
        }
        this.healthSubject.next(status);
      } else if (data.temperature[9] > plant.prefTemperature + margin) {
        const status = {
          status: 'hot',
          message: 'Open a window.'
        }
        this.healthSubject.next(status);
      } else if (data.temperature[9] < plant.prefTemperature - margin) {
        const status = {
          status: 'cold',
          message: 'Close the windows.'
        }
        this.healthSubject.next(status);
      } else {
        this.healthSubject.next(this.healthyStatus);
      }

    })
  }
}
