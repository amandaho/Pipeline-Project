import { Component, OnInit } from '@angular/core';
import { HiveService } from '../hive.service';
import * as moment from 'moment';
import _ from 'lodash'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  drivers: any [];
  driverData;
  loading = false;
  selectedDriver1;
  selectedDriver2;
  eDate = moment().unix();
  bDate = moment().subtract(7, 'days').unix();
  timeData = {
    endTime: this.eDate,
    startTime: this.bDate
  };

  constructor(private HiveService: HiveService){}

  toBeginTimestamp(strDate){
    // let ts = moment(strDate, "M/D/YYYY").valueOf()
    this.bDate = moment(strDate).unix()
    this.timeData.startTime = this.bDate;
    this.getDriverData("sumbydow", 0, this.timeData, 0);
    this.getDriverData("sumbydow", this.selectedDriver1, this.timeData, 1);
    this.getDriverData("sumbydow", this.selectedDriver2, this.timeData, 2);        
    // return strDate
  }

  toEndTimestamp(strDate){
    // let ts = moment(strDate, "M/D/YYYY").valueOf()
    this.eDate = moment(strDate).unix()
    this.timeData.endTime = this.eDate;
    this.getDriverData("sumbydow", 0, this.timeData, 0);
    this.getDriverData("sumbydow", this.selectedDriver1, this.timeData, 1);
    this.getDriverData("sumbydow", this.selectedDriver2, this.timeData, 2);    
    // return strDate
  }

  ngOnInit() {

    this.loading = true;
    this.HiveService.checkCredentials();
    this.getDrivers("driverinfo");
    this.getDriverData("sumbydow", 0, this.timeData, 0);
    // console.log(this.weekday);
  }

  getDrivers(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          drivers => {
            this.drivers = drivers;    
            // console.log(this.drivers); 
            this.loading = false;
      })
  }

  // getDriverData(endpoint:string, id){
  //   this.HiveService.getRecord(endpoint, id)
  //     .subscribe(
  //         driverData => {
  //           this.driverData = driverData;
  //           let data:Array<any> = new Array();
  //           let labels : Array<any> = new Array();
  //           for (var i = 0; i < this.driverData.length; i++) {
  //             data =  _.concat(data, this.driverData[i].status_total);
  //             labels =  _.concat(labels, this.driverData[i].dow);
  //           } 
  //           this.lineChartLabels = labels;
  //           this.lineChartData[1].data = data;
  //           this.loading = false;
  //           // console.log('driverData object:')        
  //           // console.log(this.driverData); 
  //           // console.log('data object:')    
  //           // console.log(data); 
  //           // console.log('labels object:')        
  //           // console.log(labels); 
  //     })
  // }

  getDriverData(endpoint:string, id, timeData: object, numba){
    this.HiveService.getDashboardRecord(endpoint, id, timeData)
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
            this.lineChartData[numba].data = data;
            console.log('driverData object ' + numba + ':')        
            console.log(this.driverData); 

            this.loading = false;
      })
  }

  

  driverSelect1(id){
    this.loading = true;
    this.getDriverData("sumbydow", this.selectedDriver1, this.timeData, 1);

  }

  driverSelect2(id){
    this.loading = true;
    this.getDriverData("sumbydow", this.selectedDriver2, this.timeData, 2);
  }

  public lineChartData:Array<any> = [
    { data: [], label: 'Total Sum of All Drivers' },
    { data: [], label: 'Driver 1' },
    { data: [], label: 'Driver 2' },
  ];

  public lineChartLabels:Array<any> = [];

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

interface timeData {
  endTime: number;
  startTime: number;
} 