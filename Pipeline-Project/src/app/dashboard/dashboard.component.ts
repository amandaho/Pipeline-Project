import { Component, OnInit } from '@angular/core';
import { HiveService } from '../hive.service';
import _ from 'lodash'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  drivers: any [];
  driverData;
  weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday") 

  constructor(private HiveService: HiveService){}

  ngOnInit() {
    this.HiveService.checkCredentials();
    this.getDrivers("driverinfo");
    // this.getDrivers("sumbydow", );
    // console.log(this.weekday);
  }

  getDrivers(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          drivers => {
            this.drivers = drivers;    
            // console.log(this.drivers); 
      })
  }

  getDriverData(endpoint:string, id){
    this.HiveService.getRecord(endpoint, id)
      .subscribe(
          driverData => {
            this.driverData = driverData;
            let data:Array<any> = new Array();
            let labels : Array<any> = new Array();
            for (var i = 0; i < this.driverData.length; i++) {
              data =  _.concat(data, this.driverData[i].status_total);
              labels =  _.concat(labels, this.driverData[i].dow);
            } 
            console.log('driverData object:')        
            console.log(this.driverData); 
            console.log('data object:')    
            console.log(data); 
            console.log('labels object:')        
            console.log(labels); 
      })
  }

  driverSelect(id){
    this.getDriverData("sumbydow", id);
  }

  type = 'line';
  data = {
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
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


}
