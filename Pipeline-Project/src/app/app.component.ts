import { Component, OnInit } from '@angular/core';
import { HiveService } from './hive.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  markers: any;

  constructor(private HiveService: HiveService){}

  getLocation(){
    this.HiveService.getRecords()
      .subscribe(
          markers => {
            this.markers = markers
          console.log(this.markers);
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
  
  //Markers
//   markers: marker[]= [
//   {
//     name:'Company 1',
//     lat: 39.9000,
//     lng: -86.1191
//   },
//   {
//     name:'Company 2',
//     lat: 39.9871,
//     lng: -86.1233
//   },
//   {
//     name:'Company 3',
//     lat: 39.9987,
//     lng: -86.1235
//   }
// ];

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
  
