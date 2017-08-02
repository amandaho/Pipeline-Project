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
  driver1Test = true;
  selectedDriver1;
  selectedDriver2;

  //Default the date to today because Amanda said so
  eDate = moment().format("YYYY-MM-DD");
  bDate = moment().subtract(5, 'days').format("YYYY-MM-DD");

  unixEDate = moment().unix();
  unixBDate = moment().subtract(5, 'days').unix();
  dataObject;
  timeData = {
    endTime: this.unixEDate,
    startTime: this.unixBDate
  };
  tabSwitch = "sumbydow";

  constructor(private HiveService: HiveService){}

  updateCharts(apiNumber){

    this.getLineData(this.tabSwitch, 0, this.timeData, 0, apiNumber);

    if (this.selectedDriver1 >= 0) {
      setTimeout(() => {
        this.loading = true;
          // console.log('not false for driver1')
          this.getLineData(this.tabSwitch, this.selectedDriver1, this.timeData, 1, apiNumber);
      }, 10000)
    }

    if (this.selectedDriver2 >= 0) {
      setTimeout(() => {
        this.loading = true;
          // console.log('not false for driver2')
          this.getLineData(this.tabSwitch, this.selectedDriver2, this.timeData, 2, apiNumber);     
      }, 15000)
    }

  }

  toBeginTimestamp(strDate){
    this.unixBDate = moment(strDate).unix()
    this.timeData.startTime = this.unixBDate;
    this.runAPI();     
  }

  toEndTimestamp(strDate){
    this.unixEDate = moment(strDate).unix()
    this.timeData.endTime = this.unixEDate;
    // this.runAPI();     
  }

  runAPI() {
    this.loading = true;

    if (this.tabSwitch == "sumbydow") {
      this.updateCharts(1)
    }

    if (this.tabSwitch == "driver/routehistory") {
      this.updateCharts(2)
    }

  }

enableDriver2() {
  // console.log(this.selectedDriver1)
  if (this.selectedDriver1 > 0) {
    this.driver1Test = false;
  } else {
    this.driver1Test = true;
  }

}

onLinkClick($event: any) {

  this.loading = true;

  if ( $event.index == 0){
    this.tabSwitch = "sumbydow";
    this.updateCharts(1)
  }

  if ( $event.index == 1){
    this.tabSwitch = "driver/routehistory";
    this.updateCharts(2)
  }

  if ( $event.index == 2){
    this.tabSwitch = "topfiveincidents";
    this.getTopFive(this.tabSwitch, this.timeData, 0);
    // console.log("Currently not functional")
  }

}

  ngOnInit() {

    this.loading = true;
    this.HiveService.checkCredentials();  
    this.getDrivers("driverinfo");
    this.runAPI()
  }

  getDrivers(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          drivers => {
            this.drivers = drivers;    
            this.loading = false;
      })
  }

  getTopFive(endpoint: string, timeData: object, numba){
    this.loading = true;
    this.HiveService.getRecord(endpoint, timeData)
      .subscribe(
          driverData => {
            this.driverData = driverData;
            let dataTopFive = [];
            let labels : Array<any> = new Array();

            for (var i = 0; i < this.driverData.length; i++) {
              dataTopFive =  _.concat(dataTopFive, this.driverData[i].status_total);
              labels =  _.concat(labels, this.driverData[i].dow);
            } 

            this.lineChartLabels = labels;
            this.lineChartData[numba].data = dataTopFive;

            this.loading = false
            // console.log(dataTopFive)
      },
      error => (this.loading = false)
      )
  }

  getLineData(endpoint:string, id, timeData: object, numba, flag){
    this.loading = true;
    this.HiveService.getDashboardRecord(endpoint, id, timeData)
      .subscribe(
          driverData => {

            if (flag == 1){
              this.driverData = driverData;
            }

            if (flag == 2){
              this.dataObject = [driverData];
            }

            this.driverData = driverData;
            let data = [];
            let moreData= [];
            let labels : Array<any> = new Array();

            if (flag == 1) {
              for (var i = 0; i < this.driverData.length; i++) {
                data =  _.concat(data, this.driverData[i].status_total);
                labels =  _.concat(labels, this.driverData[i].dow);
              } 

              this.lineChartLabels = labels;
              this.lineChartData[numba].data = data;
            } 

            if (flag == 2) {

            for (var i = 0; i < this.dataObject.length; i++) {
              moreData =  _.concat(moreData, this.dataObject[i].total_avg);
              labels =  [""]
            } 

              this.barChartLabels = labels;
              this.barChartData[numba].data = moreData;
            } 
            this.loading = false
            // console.log(data)
      },
      error => (this.loading = false)
        )
  }

  // Line Chart Data
  public lineChartData:Array<any> = [
    { data: [], label: 'All Drivers' },
    { data: [], label: 'Driver 1' },
    { data: [], label: 'Driver 2' },
  ];

  public lineChartLabels:Array<any> = [];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // Bar Chart Data
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = [];

  public barChartType:string = 'bar';

  public barChartLegend:boolean = true;
 
  // public barChartData:any[] = [
  public barChartData:Array<any> = [

    { data: [], label: 'All Drivers' },
    { data: [], label: 'Driver 1' },
    { data: [], label: 'Driver 2' }

    // {data: [568.0713411134831], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [35, 78, 65, 34, 45, 23, 54], label: 'Series C'}
  ];

  public lineChartColors:Array<any> = [
    { // Yellow
      backgroundColor: 'rgba(255,201,12,0.5)',
      borderColor: 'rgba(255,201,12,1)',
      pointBackgroundColor: 'rgba(255,211,12,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // orange
      backgroundColor: 'rgba(255,147,1,0.5)',
      borderColor: 'rgba(255,147,1,1)',
      pointBackgroundColor: 'rgba(255,140,1,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // teal
      backgroundColor: 'rgba(21,204,173,0.5)',
      borderColor: 'rgba(65,235,255,1.3)',
      pointBackgroundColor: 'rgba(65,230,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
}

interface timeData {
  endTime: number;
  startTime: number;
} 