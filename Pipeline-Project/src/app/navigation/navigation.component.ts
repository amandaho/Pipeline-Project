import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HiveService } from '../hive.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output() navToggle = new EventEmitter<boolean>();

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  constructor(
    private HiveService: HiveService,
  ){}

  truthVal = true;

  ngOnInit() {
  }

  navOpen() {
    this.navToggle.emit(this.truthVal);
  }

  // navClose() {
  //   if (this.truthVal == false) {
  //     this.navToggle.emit(this.truthVal);
  //   }
  //   this.truthVal = true;
  // }

  ngAfterContentChecked() {
     this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  logout(){
    this.HiveService.logout();
  }

}
