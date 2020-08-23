import { Component, OnInit } from '@angular/core';
import * as CanvasJs from '../../../assets/lib/canvasjs.min.js';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    const data = this.dashboardService.getData().subscribe(
      res => {
        let chart = new CanvasJs.Chart("chartContainer", res);
        chart.render();
      },
      error => console.log(error)
    );
  }
}
