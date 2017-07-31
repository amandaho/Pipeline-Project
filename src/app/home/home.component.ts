import { Component, OnInit } from '@angular/core';
import { HiveService } from '../hive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  constructor(
    private HiveService: HiveService
  ) { }

  ngOnInit() {
     this.HiveService.checkCredentials()
  }

}