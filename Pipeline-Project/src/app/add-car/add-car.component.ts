import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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


  constructor(
    private hiveService: HiveService, 
    private router: Router, 
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    
  }

  saveDriver(id){
    if(typeof id === "number"){
      this.hiveService.editRecord("addDriver", this.driver, id)
          .subscribe(
            driver => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else {
      this.hiveService.addRecord("addDriver", this.driver)
          .subscribe(
            driver => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);      
            
    }
          // this.router.navigate(['/admin'])
  }        


}
