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
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
