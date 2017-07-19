import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { AdminComponent }   from '../admin/admin.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HomeComponent }   from '../home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'dashboard',  component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageRoutingModule { }
