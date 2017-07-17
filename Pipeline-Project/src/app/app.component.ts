import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My first AGM project';

  // Zoom Level
  zoom: number = 10;

  // Start Position
  lat: number = 39.9784;
  lng: number = -86.1190;

  // Markers
  markers: marker[] = [
    {
      name: 'Company One',
      lat: 39.9000,
      lng: -86.1190
    },
    {
      name: 'Company Two',
      lat: 39.9784,
      lng: -86.1190
    }
  ];

  constructor(){
    
  }

}

  // Marker Type
  interface marker{
    name?:string;
    lat:number;
    lng:number;
  }