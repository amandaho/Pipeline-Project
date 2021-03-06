import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { HiveService } from '../hive.service'
import { CarService } from '../car.service'

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
  driver: object = {
    vehicle_make: <string> null,
    vehicle_year: <number> null,
    vehicle_model: <string> null,
    driver_first_name: <string> null,
    driver_last_name: <string> null,
    vid: <number> null,
  };
  years: any;
  makes: any;
  models: any;
  makesArray = [];
  modelsArray = [];
  yearArray = [];
  loading = false;

  firstFormControl = new FormControl('', [
    Validators.minLength(2)
  ]);

  lastFormControl = new FormControl('', [
    Validators.minLength(2)
  ]);

  constructor(
    private hiveService: HiveService,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.hiveService.getRecord("driverinfo", +params['id']))
      .subscribe(driver => {
        this.driver = driver
        this.getMakes(this.driver["vehicle_year"])
        this.getModels(this.driver["vehicle_year"], this.driver["vehicle_make"])
      },
      error => {
            this.errorMessage = <any>error;
      })
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
        this.getYears()
      });
  }


  saveDriver(id) {
    this.loading = true;
    if (typeof id === "number") {
      console.log("got to edit driver")
      this.hiveService.editRecord("driver", this.driver, id)
        .subscribe(
          driver => {
            this.successMessage = "Record updated succesfully";
            this.loading=false;
          }, 
          error => {
            this.errorMessage = <any>error;
            this.loading=false;
          },
          
        );
    } else {
      console.log("got to add driver")
      this.hiveService.addRecord("addDriver", this.driver)
        .subscribe(
         driver => {
            this.successMessage = "Record added succesfully";
            this.loading=false;
         },
          error => {
            this.errorMessage = <any>error;
            this.loading=false;
          },
        );

    }
    this.driver = {};
    // this.router.navigate(['/admin'])
  }

  getYears() {
  this.carService.getVehicleYears("getYears")
    .subscribe(
      years => {
        this.years = years;
        this.setYearsArray(parseInt(this.years.Years.min_year), this.years.Years.max_year);
      },
      error => this.errorMessage = <any>error
    );
  }

  setYearsArray(min, max) {
    for (let i = max; i >= min; i--) {
      this.yearArray.push(i);
    }
  }

  getMakes(barbie) {
    this.carService.getVehicleMakes("getMakes", barbie)
      .subscribe(
        makes => {
          this.makes = makes.Makes;
          console.log(this.makes)
        },
        error => this.errorMessage = <any>error
      );
  }

  getModels(barbie, ken) {
    this.carService.getVehicleModels("getModels", barbie, ken)
      .subscribe(
      models => {
        this.models = models.Models;
        console.log(this.models)
      },
      error => this.errorMessage = <any>error);
  }

}

// interface driver {
//   vehicle_make;
//   vehicle_year;
//   vehicle_model;
//   driver_first_name;
//   driver_last_name;
//   vid;
// }