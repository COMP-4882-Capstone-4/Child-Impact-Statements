import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ZipcodeComponent } from './zipcode/zipcode.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'zipcode', component: ZipcodeComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
