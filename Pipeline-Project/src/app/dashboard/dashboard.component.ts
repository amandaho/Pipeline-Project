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
  eDate;
  bDate;
  unixEDate = moment().unix();
  unixBDate = moment().subtract(7, 'days').unix();
  dataObject;
  timeData = {
    endTime: this.unixEDate,
    startTime: this.unixBDate
  };

  constructor(private HiveService: HiveService){}

  updateCharts(){
    this.getLineData("sumbydow", 0, this.timeData, 0, 1);
    this.getLineData("sumbydow", this.selectedDriver1, this.timeData, 1, 1);
    this.getLineData("sumbydow", this.selectedDriver2, this.timeData, 2, 1);        
  }

  toBeginTimestamp(strDate){
    // let ts = moment(strDate, "M/D/YYYY").valueOf()
    this.unixBDate = moment(strDate).unix()
    this.timeData.startTime = this.unixBDate;
    this.updateCharts();      
    // return strDate
  }

  toEndTimestamp(strDate){
    // let ts = moment(strDate, "M/D/YYYY").valueOf()
    this.unixEDate = moment(strDate).unix()
    this.timeData.endTime = this.unixEDate;
    this.updateCharts();      
    // return strDate
  }

  runAPI() {
    this.loading = true;
    // this.getLineData("sumbydow", 0, this.timeData, 0, 1);
    this.getLineData("driver/routehistory", 0, this.timeData, 0, 2);
  }

  ngOnInit() {

    // this.loading = true;
    this.HiveService.checkCredentials();
    // this.getDrivers("driverinfo");
    // this.getLineData("sumbydow", 0, this.timeData, 0, 1);
    // this.getLineData("driver/routehistory", 0, this.timeData, 0, 2);
    // console.log(this.weekday);
  }

  getDrivers(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          drivers => {
            this.drivers = drivers;    
            this.loading = false;
      })
  }

  getLineData(endpoint:string, id, timeData: object, numba, flag){
    this.HiveService.getDashboardRecord(endpoint, id, timeData)
      .subscribe(
          driverData => {
            this.driverData = driverData;
            let data:Array<any> = new Array();
            let labels : Array<any> = new Array();
            // console.log(driverData);

            if (flag == 1) {
              for (var i = 0; i < this.driverData.length; i++) {
                data =  _.concat(data, this.driverData[i].status_total);
                labels =  _.concat(labels, this.driverData[i].dow);
              } 

              // console.log('SUMBYDOW object ' + numba + ':')        
              // console.log(this.driverData); 

              this.lineChartLabels = labels;
              this.lineChartData[numba].data = data;
              console.log(this.lineChartData)
              this.loading = false;
              this.loading = true;
            } 

            else if (flag == 2) {

              // console.log(this.driverData)
              data.push(this.driverData.total_avg)
              this.barChartData[numba].data = data;
              console.log(this.barChartData)
              // data =  _.concat(data, this.driverData[0]);
              // this.barChartData[numba].data = data;
              // // console.log(this.barChartData)
              // this.loading = false;
              // console.log("this is data: " + data)
              // console.log("this is driverData: " + this.driverData)

            } 

            this.loading = false;
      },
      error => (this.loading = false)
        )
  }

  driverSelect1(id){
    this.loading = true;
    this.getLineData("sumbydow", this.selectedDriver1, this.timeData, 1, 1);
  }

  driverSelect2(id){
    this.loading = true;
    this.getLineData("sumbydow", this.selectedDriver2, this.timeData, 2, 1);
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

  public barChartLabels:Array<any> = ["","",""];

  public barChartType:string = 'line';

  public barChartLegend:boolean = true;
 
  public barChartData:Array<any>  = [
    {data: [], label: 'All Drivers'},
    {data: [], label: 'Driver 1'},
    {data: [], label: 'Driver 2'}
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

interface dataObject {
  total_avg: number;
  vid_avg: number;
}