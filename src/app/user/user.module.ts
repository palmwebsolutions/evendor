import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import { VendorComponent, ItemListComponent,  NewOrderComponent,  LocationsComponent, AccountComponent, OrderHistoryComponent, RecipientComponent } from './index';
import { AddVendorComponent, ShowVendorComponent } from './vendor/index';
import { AddRecipientComponent, ShowRecipientComponent } from './recipient/index';
import { MainListComponent } from './item-list/main-list/main-list.component';
import { NewListComponent } from './item-list/new-list/new-list.component';
import { CustomItemComponent } from './item-list/custom-item/custom-item.component';



@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  declarations: [VendorComponent, ItemListComponent, NewOrderComponent, LocationsComponent, AccountComponent, OrderHistoryComponent, AddVendorComponent, ShowVendorComponent, RecipientComponent, AddRecipientComponent, ShowRecipientComponent, MainListComponent, NewListComponent, CustomItemComponent ]
})
export class UserModule { }
