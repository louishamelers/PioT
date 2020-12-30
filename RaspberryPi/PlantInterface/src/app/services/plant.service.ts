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

// todo add plant types and calculations for each, then show in dialog

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly dataSubject: BehaviorSubject<Status> = new BehaviorSubject<Status>(Status.Healthy);

  get plantStatus(): Observable<Status> {
    return this.dataSubject.asObservable();
  }
  public get statuses(): typeof Status {
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
