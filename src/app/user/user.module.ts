import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import { VendorComponent, ItemListComponent,  NewOrderComponent,  LocationsComponent, AccountComponent, OrderHistoryComponent, RecipientComponent } from './index';
import { AddVendorComponent, ShowVendorComponent } from './vendor/index';
import { AddRecipientComponent, ShowRecipientComponent } from './recipient/index';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  declarations: [VendorComponent, ItemListComponent, NewOrderComponent, LocationsComponent, AccountComponent, OrderHistoryComponent, AddVendorComponent, ShowVendorComponent, RecipientComponent, AddRecipientComponent, ShowRecipientComponent ]
})
export class UserModule { }
