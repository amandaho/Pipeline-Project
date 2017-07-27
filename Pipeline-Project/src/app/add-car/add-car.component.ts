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
  driver: object = {};
  years: any;
  makes: any;
  models: any;
  makesArray = [];
  modelsArray = [];
  yearArray = [];

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
      })
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
        this.getYears()
      });

      console.log(this.yearArray)
  }


  saveDriver(id) {
    if (typeof id === "number") {
      console.log("got to edit driver")
      this.hiveService.editRecord("driver", this.driver, id)
        .subscribe(
          driver => this.successMessage = "Record updated succesfully",
          error => this.errorMessage = <any>error
        );
    } else {
      console.log("got to add driver")
      this.hiveService.addRecord("addDriver", this.driver)
        .subscribe(
          driver => this.successMessage = "Record added succesfully",
          error => this.errorMessage = <any>error
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
