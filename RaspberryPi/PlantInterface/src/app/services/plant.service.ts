import { Injectable } from '@angular/core';
import {DataService, SensorData} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {combineLatest} from "rxjs";

export enum Status {
  Healthy,
  Dry,
  Cold
}

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
    prefHumidity: 23,
    prefLight: 23,
    prefSoilMoisture: 23,
    prefTemperature: 32
  },
  {
    plantName: 'Fern',
    prefHumidity: 23,
    prefLight: 23,
    prefSoilMoisture: 23,
    prefTemperature: 32
  },
  {
    plantName: 'RubberPlant',
    prefHumidity: 23,
    prefLight: 23,
    prefSoilMoisture: 23,
    prefTemperature: 32
  }
];

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly healthSubject: BehaviorSubject<Status> = new BehaviorSubject<Status>(Status.Healthy);
  private readonly plantSubject: BehaviorSubject<PlantProperties> = new BehaviorSubject<PlantProperties>(PLANT_PROPERTIES[0])

  public get statuses(): typeof Status {
    return Status;
  }
  public get getPlants(): PlantProperties[] {
    return PLANT_PROPERTIES;
  }

  public get plantStatus(): Observable<Status> {
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
      // console.log(data);
      // console.log(plant);
      // We do some calculations here
      this.healthSubject.next(Status.Healthy);
    })
  }
}
