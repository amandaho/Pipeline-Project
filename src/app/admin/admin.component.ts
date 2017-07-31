import { Component, OnInit, Input } from '@angular/core';
import { HiveService } from '../hive.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { MdDialog, MdDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-admin', 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  vehs: any;
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';
  loading = false;

  // displayedColumns = ['id', 'lati', 'longi', 'status', 'timestamp'];
  displayedColumns = ['id'];
  // exampleDatabase = new ExampleDatabase();
  dataSource: HiveService | null;

  constructor(
    private HiveService: HiveService,
    public dialog: MdDialog){}

  ngOnInit(): void {

    this.dtOptions = {
      paging: true,
      searching: true,
      columns: [
        {
          title: 'ID',
          data: 'id'
        }, {
          title: 'Driver First Name',
          data: 'driver_first_name'
        }, {
          title: 'Driver Last name',
          data: 'driver_last_name'
        }, {
          title: 'Year',
          data: 'vehicle_year'
        }, {
          title: 'Make',
          data: 'vehicle_make'
        },{
          title: 'Model',
          data: 'vehicle_model'
        },{
          title: 'Admin'
        },
      ],
      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'copy', 'csv', 'excel', 'pdf', 'print'  
      ]
    }

    this.loading = true;
    this.HiveService.checkCredentials();
    this.getLocation("driverinfo");

  }

  getLocation(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
        vehs => {
          this.vehs = vehs;
          this.dtTrigger.next(); 
          this.loading = false; 
        }
      )

  }

  deleteCar(id:number) {
    this.loading = true;

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.HiveService.deleteRecord("driver", id)
          .subscribe(
            vehs => {
              this.successMessage = "Record(s) deleted succesfully"; 
              this.getLocation("driverinfo");
              this.loading = false;
            },
            error =>  {
              this.errorMessage = <any>error
              this.loading = false;
            });
      }
          console.log("deleted")
          this.loading = false;
    });
  }
  

}

export interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}