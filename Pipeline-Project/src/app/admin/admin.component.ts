import { Component, OnInit } from '@angular/core';
import { MdPaginator } from '@angular/material';
import { HiveService } from '../hive.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  vehs: any;
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  // displayedColumns = ['id', 'lati', 'longi', 'status', 'timestamp'];
  displayedColumns = ['id'];
  // exampleDatabase = new ExampleDatabase();
  dataSource: HiveService | null;

  // @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private HiveService: HiveService, public dialog: MdDialog){}

  ngOnInit() {
    this.HiveService.checkCredentials();
    this.getLocation("driverinfo");
  }

  getLocation(endpoint:string){
    this.HiveService.getRecords(endpoint)
      .subscribe(
          vehs => {
            this.vehs = vehs     
      })
  }

  deleteCar(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.HiveService.deleteRecord("driver", id)
          .subscribe(
            vehs => {this.successMessage = "Record(s) deleted succesfully"; this.getLocation("driverinfo");},
            error =>  this.errorMessage = <any>error);
      }
          console.log("deleted")
    });
  }

}

export interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}