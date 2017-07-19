import { Component, OnInit } from '@angular/core';
import { HiveService } from './hive.service'

import {Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange,
  AfterContentInit, ContentChildren, QueryList, Input, Output
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  
  markers: any;

  constructor(private HiveService: HiveService){
  }

  getLocation(){
    this.HiveService.getRecords()
      .subscribe(
          markers => {
            this.markers = markers
            console.log(this.markers)       
      }
    );
  }

  clickedMarker(marker:marker){
    console.log('Clicked Marker: '+marker.id)
  }

  //Zoom level
  zoom: number = 11;
  //Start Position
  lat: number = 37.75134;
  lng: number = -122.39488;


ngOnInit() {
  // this.getLocation();
  //   setInterval(() => {
      this.getLocation();
    // }, 3000);
    
   
  }

}


interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}
  
