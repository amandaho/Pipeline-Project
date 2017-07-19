import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ApplicationRef } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() location; 
  @Output() map = new EventEmitter();

  
  //Zoom level
  zoom: number = 11;
  //Start Position
  lat: number = 37.75134;
  lng: number = -122.39488;

  constructor() { }

  ngOnInit() {
  }

  getMarkers(){
    this.map.emit();

  }

}

