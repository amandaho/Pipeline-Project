import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog2() {
    this.dialog.open(DialogOverviewExampleDialog);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<div><img src="http://gph.is/1Em3V1u" /></div>',
})
export class DialogOverviewExampleDialog {}