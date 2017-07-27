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
  // dataTest: any = [443, 489, 731, 1410, 734, 469, 409];
  // labelTest: any = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  // weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday") 

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
            this.lineChartLabels = labels;
            this.lineChartData[1].data = data;
            // console.log('driverData object:')        
            // console.log(this.driverData); 
            // console.log('data object:')    
            // console.log(data); 
            // console.log('labels object:')        
            // console.log(labels); 
      })
  }

  driverSelect(id){
    this.getDriverData("sumbydow", id);
    // console.log(this.data);
  }

public lineChartData:Array<any> = [
    { data: [653, 598, 809, 831, 556, 545, 470], label: 'Driver Average' },
    { data: [], label: 'Specified Driver' },
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // blue
      backgroundColor: 'rgba(63,81,181,0.2)',
      borderColor: 'rgba(63,81,181,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // orange
      backgroundColor: 'rgba(253,161,89,0.3)',
      borderColor: 'rgba(253,161,89,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
}
