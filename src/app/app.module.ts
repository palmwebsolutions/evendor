import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { vendorService } from './user/shared/vendorService';
import { RecipientService } from './user/shared/recipientService';
import { ItemService } from './user/shared/itemService';
import { UserListService } from './user/shared/userListService';
import { CustomItemService } from './user/shared/customItemService';
import { ItemNoteService } from './user/shared/itemNoteService';
import { CRUD } from './user/shared/crud';
import { OnCreate } from './user/shared/checkboxDirective';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';
//import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    OnCreate
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [vendorService, RecipientService, ItemService, UserListService, CustomItemService, ItemNoteService, CRUD],
  bootstrap: [AppComponent]
})
export class AppModule { }
