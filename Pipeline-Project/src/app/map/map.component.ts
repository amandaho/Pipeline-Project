import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ApplicationRef } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HiveService } from '../hive.service';
import _ from 'lodash'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  markers: any;
  errorMessage: string;
  mode = 'Observable';
  mapTimer = 30;
  loading = false;

  retreiveDrivers: any;

  constructor(private HiveService: HiveService){}

  ngOnInit() {
    this.loading = true;
    this.HiveService.checkCredentials();  
    this.getLocation();
    // this.getDriver();
      setInterval(() => {
        this.getLocation();
        // this.getDriver();
      }, 30000);
      setInterval(() => {
      this.autoRefresh();
    }, 1000);

  }

  getLocation(){
    this.loading = true;
    this.HiveService.getRecords("updatelocations")
      .subscribe(
          markers => {
            this.markers = markers
            for(let i = 0; i < this.markers.length; i++ ){
              this.HiveService.getRecord("driverinfo", this.markers[i].vid)
                .subscribe(
                  driverInfo => {
                      this.markers[i] =  _.merge({}, this.markers[i], driverInfo);
                      // console.log(this.markers[i]);
                  },
                  error => {
                    this.loading = false;
                    // console.log("shit bad happend")
                  }
                )
            }  
      this.loading = false;
      },
        error =>  {
          this.loading = false;
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
          this.errorMessage= "There is an error connecting to the API";
        });
          
  }

  onClick() {
    console.log("button clicked")
    this.getLocation();
  }

  autoRefresh() {
    if (this.mapTimer > 0) {
     this.mapTimer -= 1;
    } else {
      this.mapTimer = 30;
    }
  }


  clickedMarker(marker:marker){
    console.log('Clicked Marker: '+marker.vid)
  }
  
  //Zoom Level
  zoom: number = 11;
  //Start Position
  lat: number = 37.75134;
  lng: number = -122.39488;

}

interface marker {
  vid?: string;
  lat: number;
  lng: number;
  status: string;
}

interface retreiveDriver {
  vid?: number;
  driver_first_name: string; 
  driver_last_name: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
}