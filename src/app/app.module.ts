import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { vendorService } from './user/shared/vendorService';
import { RecipientService } from './user/shared/recipientService';
import { ItemService } from './user/shared/itemService';
import { OnCreate } from './user/shared/checkboxDirective';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';


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
  providers: [vendorService, RecipientService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
