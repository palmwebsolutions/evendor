import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: '', 
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "signup",
    component: RegistrationComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//(routes, { useHash: true })
