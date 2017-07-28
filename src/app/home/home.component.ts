import { Component, OnInit } from '@angular/core';
// import {MdDialog} from '@angular/material';
import { HiveService } from '../hive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  constructor(
    // public dialog: MdDialog,
    private HiveService: HiveService
  ) { }

  ngOnInit() {
     this.HiveService.checkCredentials()
  }

  // openDialog2() {
  //   this.dialog.open(DialogOverviewExampleDialog);
  // }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   template: '<div><img src="http://gph.is/1Em3V1u" /></div>',
// })
// export class DialogOverviewExampleDialog {}