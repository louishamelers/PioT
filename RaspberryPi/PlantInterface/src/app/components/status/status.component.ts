import { Component, OnInit } from '@angular/core';
import {PlantService} from '../../services/plant.service';
import {OptionsComponent} from '../options/options.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(public healthService: PlantService) {
    healthService.plantStatus.subscribe();
  }

  ngOnInit(): void {
  }
}
