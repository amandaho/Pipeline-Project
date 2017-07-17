import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Zoom level
  zoom: number = 10;
  //Start Position
  lat: number = 39.9784;
  lng: number = -86.1190;
  //Markers
  markers: marker[]= [
  {
    name:'Company 1',
    lat: 39.9000,
    lng: -86.1191
  },
  {
    name:'Company 2',
    lat: 39.9871,
    lng: -86.1233
  },
  {
    name:'Company 3',
    lat: 39.9987,
    lng: -86.1235
  }
];

  constructor(){

  }

}

interface marker {
  name?: string;
  lat: number;
  lng: number;
}
  
