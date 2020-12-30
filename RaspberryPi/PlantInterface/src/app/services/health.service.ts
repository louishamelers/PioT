import { Injectable } from '@angular/core';
import {DataService, SensorData} from './data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {flatMap} from 'tslint/lib/utils';

export enum Status {
  Healthy,
  Dry,
  Cold
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly dataSubject: BehaviorSubject<Status> = new BehaviorSubject<Status>(Status.Healthy);

  get plantStatus(): Observable<Status> {
    return this.dataSubject.asObservable();
  }
  public get healthStatuses(): typeof Status {
    return Status;
  }

  constructor(private dataService: DataService) {
    dataService.sensorData.subscribe(data => {
        // We do some calculations here
        this.dataSubject.next(Status.Healthy);
      }
    );
  }
}
