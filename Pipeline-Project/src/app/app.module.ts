import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule }   from '@angular/router';
import { MdCardModule } from '@angular/material';
import {MdTableModule} from '@angular/material';
import {MdDialog} from '@angular/material';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
// import { AppRoutingModule } from './routing/routing.module';
import { routes } from './routing/app.router';
import { ChartModule } from 'angular2-chartjs';

import { AgmCoreModule } from '@agm/core';
import { HiveService } from './hive.service';
import { HttpModule } from '@angular/http';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './create-account/create-account.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    MapComponent,
    StatusMessageComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    routes,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCK35x5jSnSEfukM5AtISDXjyODWbSaLcg'
    })
  ],
  providers: [HiveService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
