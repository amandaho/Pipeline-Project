import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ApplicationRef } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HiveService } from '../hive.service';

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

  constructor(private HiveService: HiveService){}

  ngOnInit() {
  this.getLocation();
    setInterval(() => {
      this.getLocation();
    }, 30000);
    setInterval(() => {
    this.autoRefresh();
  }, 1000);

  }

  getLocation(){
    this.HiveService.getRecords()
      .subscribe(
          markers => {
            this.markers = markers     
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

  clickedMarker(marker:marker){
    console.log('Clicked Marker: '+marker.id)
  }

  //Zoom Level
  zoom: number = 11;
  //Start Position
  lat: number = 37.75134;
  lng: number = -122.39488;

}

interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}

