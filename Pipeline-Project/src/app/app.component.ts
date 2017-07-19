import { Component, OnInit } from '@angular/core';
import { HiveService } from './hive.service'

// import {Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange,
//   AfterContentInit, ContentChildren, QueryList, Input, Output
// } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  
  markers: any;
  errorMessage: string;

  constructor(private HiveService: HiveService){
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

  clickedMarker(marker:marker){
    console.log('Clicked Marker: '+marker.id)
  }


ngOnInit() {

    this.getLocation();
   
  }

}


interface marker {
  id?: string;
  lat: number;
  lng: number;
  status: string;
}
  
