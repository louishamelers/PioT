import { Component, OnInit } from '@angular/core';
import {PlantProperties, PlantService} from "../../services/plant.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(public plantService: PlantService) { }

  ngOnInit(): void {
  }

}
