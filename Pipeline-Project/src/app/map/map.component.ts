import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ApplicationRef } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HiveService } from '../hive.service';
import _ from 'lodash'; 

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
  buttonEnabled: boolean;

  retreiveDrivers: any;

  constructor(private HiveService: HiveService){}

  ngOnInit() {
    this.getLocation();
    // this.getDriver();

    setInterval(() => {
        console.log("returned merged")
        this.getMerged();
      }, 10000);

      setInterval(() => {
        this.getLocation();
        // this.getDriver();
      }, 30000);
      setInterval(() => {
      this.autoRefresh();
    }, 1000);

    

  }

  getLocation(){
    this.HiveService.getRecords("updatelocations")
      .subscribe(
          markers => {
            this.markers = markers;
            console.log(this.markers);    
      },
        error =>  {
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

  // private _lastOpenIndex: number = -1;
  // @ViewChild('agmMarker'): AgmCoreModule;

  clickedMarker(marker:marker){
    console.log('Clicked Marker: '+marker.vid)

    // data['isOpen'] = true;
    // if (this._lastOpenIndex > -1) this.agmMarker[this._lastOpenIndex]['isOpen'] = false;
    // this._lastOpenIndex = index;

    this.HiveService.getRecord("driverinfo", marker.vid)
      .subscribe(
        retreiveDrivers => {
          this.retreiveDrivers = retreiveDrivers;
          console.log(this.retreiveDrivers);
      },
        error =>  {
          this.errorMessage = <any>error;
      });

  }
  
  // getDriver(){
  //   this.HiveService.getRecords("driverinfo")
  //     .subscribe(
  //       retreiveDrivers => {
  //         this.retreiveDrivers = retreiveDrivers;
  //         console.log(this.retreiveDrivers);
          
  //     },
  //       error =>  {
  //         this.errorMessage = <any>error;
  //     });
  // }

  getMerged(){
    // let merged = _.map(this.retreiveDrivers, function(item){
    //   return _.extend(item, _.findWhere(this.markers,{id: item.vid}))
      
      // let merged = Object.assign({}, this.markers, this.retreiveDrivers)

     let merged = {};
     for(var id in this.markers) merged[id] = this.markers[id];
     for(var vid in this.retreiveDrivers) merged[vid] = this.retreiveDrivers[id];
  
}

  //Zoom Level
  zoom: number = 11;
  //Start Position
  lat: number = 37.75134;
  lng: number = -122.39488;

}

interface marker {
  vid?: number;
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