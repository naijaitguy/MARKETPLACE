import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Router, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Users/authentication/authentication.component';
import { CreateAccountComponent } from './Users/create-account/create-account.component';
import { from } from 'rxjs';

import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { NavigationbarComponent } from './Layout/navigationbar/navigationbar.component';
import { SliderComponent } from './Layout/slider/slider.component';
import { HomeComponent } from './Users/home/home.component';

import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';

import { AddFoodcatergoryComponent } from './Admin/add-foodcatergory/add-foodcatergory.component';
import { CreateMarketComponent } from './Admin/create-market/create-market.component';
import { AdminAuthenicationComponent } from './Admin/admin-authenication/admin-authenication.component';
import { ManageAccountComponent } from './Admin/manage-account/manage-account.component';
import { EditMarketComponent } from './Admin/edit-market/edit-market.component';
import { ViewMarketComponent } from './Admin/view-market/view-market.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { ContactComponent } from './Admin/contact/contact.component';
import { AboutComponent } from './Admin/about/about.component';
import { UploadComponent } from './Admin/upload/upload.component';
import { Upload1Component } from './Admin/New folder/upload1/upload1.component';
import { Upload2Component } from './Admin/New folder/upload2/upload2.component';
import { Upload3Component } from './Admin/New folder/upload3/upload3.component';
import { MarketService } from './Services/market.service';
import { AuthenticationServicesService } from './Services/authentication-services.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CreateAccountComponent,

    HeaderComponent,
    FooterComponent,
    NavigationbarComponent,
    SliderComponent,
    HomeComponent,
 
    AdminHomeComponent,
   
    AddFoodcatergoryComponent,
    CreateMarketComponent,
    AdminAuthenicationComponent,
    ManageAccountComponent,
    EditMarketComponent,
    ViewMarketComponent,
    AdminProfileComponent,
    ContactComponent,
    AboutComponent,
    UploadComponent,
    Upload1Component,
    Upload2Component,
    Upload3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ MarketService, AuthenticationServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
