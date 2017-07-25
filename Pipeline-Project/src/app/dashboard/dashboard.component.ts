import { Component, OnInit } from '@angular/core';
import { HiveService } from '../hive.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private HiveService: HiveService){}

  ngOnInit() {
    this.HiveService.checkCredentials()
  }

  type = 'line';
  data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55]
      },
      {
        label: "My Second dataset",
        data: [45, 34, 98, 56, 34, 23]
      },
      {
        label: "My Third dataset",
        data: [55, 25, 99, 67, 54, 66]
      },
      
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  type2 = 'pie';
  data2 = {
    labels: ["July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "My First dataset",
        data: [63, 22, 88, 45, 89, 99]
      },
      {
        label: "My Second dataset",
        data: [12, 22, 64, 23, 94, 34]
      },
      {
        label: "My Third dataset",
        data: [65, 34, 98, 65, 34, 78]
      },
      
    ]
  };
  options2 = {
    responsive: true,
    maintainAspectRatio: false
  };

  type3 = 'bar';
  data3 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 63, 22, 88, 45, 89, 99]
      },
      {
        label: "My Second dataset",
        data: [45, 34, 98, 56, 34, 23, 12, 22, 64, 23, 94, 34]
      },
      {
        label: "My Third dataset",
        data: [55, 25, 99, 67, 54, 66, 65, 34, 98, 65, 34, 78]
      },
      
    ]
  };
  options3 = {
    responsive: true,
    maintainAspectRatio: false
  };


}
