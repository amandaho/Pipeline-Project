import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
<<<<<<< HEAD
import { MapComponent } from './map/map.component';

@NgModule({
=======

@NgModule({
  declarations: [
    AppComponent,
  ],
>>>>>>> bfe3e58e8db8ec0d7e8d2b94d11b00112ef3f125
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
<<<<<<< HEAD
      apiKey: 'AIzaSyCK35x5jSnSEfukM5AtISDXjyODWbSaLcg'
=======
      apiKey: 'AIzaSyBqhnn436gAdzBBdetcfQIufYiwluTLnKc'
>>>>>>> bfe3e58e8db8ec0d7e8d2b94d11b00112ef3f125
    })
  ],
  providers: [],
  declarations: [ AppComponent, MapComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
