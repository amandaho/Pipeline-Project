import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { HiveService } from '../hive.service'

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  driver = {
    driver_first_name: <string> null,
    driver_last_name: <string> null,
    vehicle_make: <string> null,
    vehicle_model: <string> null,
    vehicle_year: <number> null,
  };

  addCar: NgForm;
  @ViewChild('addCar') currentForm: NgForm;

  constructor(private hiveService: HiveService){}

  ngOnInit() {

    
  }

  saveDriver(){
   
      this.hiveService.addRecord("addDriver", this.driver)
          .subscribe(
            driver => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            
            
    }


}
