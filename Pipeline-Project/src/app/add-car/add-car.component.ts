import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { HiveService } from '../hive.service'

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {

  addCar: NgForm;
  @ViewChild('addCar') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  driver = {
    // driver_first_name: <string> null,
    // driver_last_name: <string> null,
    // vehicle_make: <string> null,
    // vehicle_model: <string> null,
    // vehicle_year: <number> null,
  };

  firstFormControl = new FormControl('', [
    Validators.minLength(2)
  ]);

  lastFormControl = new FormControl('', [
    Validators.minLength(2)
  ]);

  constructor(
    private hiveService: HiveService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.hiveService.getRecord("driverinfo", +params['id']))
      .subscribe(driver => this.driver = driver);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveDriver(id){
    if(typeof id === "number"){
      console.log("got to edit driver")
      this.hiveService.editRecord("driver", this.driver, id)
          .subscribe(
            driver => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else {
      console.log("got to edit driver")
      this.hiveService.addRecord("addDriver", this.driver)
          .subscribe(
            driver => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);      
            
    }
          this.driver = {};
          // this.router.navigate(['/admin'])
  }


}


