import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {OptionsComponent} from '../options/options.component';
import {PlantService} from '../../services/plant.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(OptionsComponent, {
      width: '250px'
    });
  }

}
