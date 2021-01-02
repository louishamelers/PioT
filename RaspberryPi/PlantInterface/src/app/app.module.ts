import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {ChartsModule} from 'ng2-charts';
import { SensorGraphComponent } from './components/sensor-graph/sensor-graph.component';
import { HeaderComponent } from './components/header/header.component';
import { LabelsComponent } from './components/labels/labels.component';
import {CommonModule} from '@angular/common';
import { StatusComponent } from './components/status/status.component';
import {NotationPipe} from './pipes/notation.pipe';
import { OptionsComponent } from './components/options/options.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    SensorGraphComponent,
    HeaderComponent,
    LabelsComponent,
    StatusComponent,
    NotationPipe,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule,
    MatDialogModule,
    MatRippleModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
