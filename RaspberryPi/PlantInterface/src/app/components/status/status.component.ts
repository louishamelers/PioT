import { Component, OnInit } from '@angular/core';
import {HealthService} from '../../services/health.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(public healthService: HealthService) {
    healthService.plantStatus.subscribe(oke => console.log(oke));
  }

  ngOnInit(): void {
  }

}
