import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
 
import { HomeComponent }   from '../home/home.component';
import { AppComponent } from '../app.component';
import { MapComponent }   from '../map/map.component';
import { AdminComponent }   from '../admin/admin.component';
import { LoginComponent }   from '../login/login.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { CreateAccountComponent }   from '../create-account/create-account.component';
import { AddCarComponent }   from '../add-car/add-car.component';

const router: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'map',  component: MapComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'create-account',  component: CreateAccountComponent },
  { path: 'add-car',  component: AddCarComponent },
];
 
// @NgModule({
//   imports: [ RouterModule.forRoot(routes) ],
//   exports: [ RouterModule ]
// })
// export class AppRoutingModule {}

export const routes: ModuleWithProviders = RouterModule.forRoot(router)