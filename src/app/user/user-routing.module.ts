import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./user.component";
import { VendorComponent, ItemListComponent,  NewOrderComponent,  LocationsComponent, AccountComponent, OrderHistoryComponent, RecipientComponent } from './index';


const routes: Routes = [
  
  {
    path: "",
    redirectTo: "/user",
    pathMatch: "full"
  },
  {
    path: "user",
    component: UserComponent,
    children:[
      {
        path: "",
        redirectTo: "/user/vendor",
        pathMatch: "full"
      },
      {
        path: "vendor",
        component: VendorComponent
      },
      {
        path: "recipient",
        component: RecipientComponent
      },
      {
        path: "itemlist",
        component: ItemListComponent
      },
      {
        path: "neworder",
        component: NewOrderComponent
      },
      {
        path: "locations",
        component: LocationsComponent
      },
      {
        path: "history",
        component: OrderHistoryComponent
      },
      {
        path: "account",
        component: AccountComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
