import { Component, OnInit } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { HiveService } from '../hive.service';
import { NgModule, ApplicationRef } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  vehs: any;
  errorMessage: string;
  mode = 'Observable';

  // displayedColumns = ['id', 'lati', 'longi', 'status', 'timestamp'];
  displayedColumns = ['id'];
  // exampleDatabase = new ExampleDatabase();
  dataSource: HiveService | null;

  // @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private HiveService: HiveService){}

  ngOnInit() {
    this.getLocation("driverinfo");
  }

  getLocation(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          vehs => {
            this.vehs = vehs     
      })
  }

}

export interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}