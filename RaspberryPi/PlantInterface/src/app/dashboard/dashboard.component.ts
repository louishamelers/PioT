import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  socket: any;
  readonly uri: string = 'localhost:3000';

  constructor() {
    this.socket = io.io(this.uri);
    this.socket.on('test event', data => {
      console.log(data);
    });
  }
}
