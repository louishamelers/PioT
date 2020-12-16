import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { BasicGraphComponent } from './cards/basic-graph/basic-graph.component';
import {ChartsModule} from 'ng2-charts';
import { SensorGraphComponent } from './cards/sensor-graph/sensor-graph.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: true,
  hostname: 'eu.thethings.network',
  port: 8883,
  path: '/mqtt',
  protocol: 'ws',
  // username: 'iot-plant-solution',
  // password: 'ttn-account-v2.BmgSn0RYmHUlyNtJ79Ew73sTfoW4qgIG8db_cWuhWwM'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BasicGraphComponent,
    SensorGraphComponent
  ],
  imports: [
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
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
