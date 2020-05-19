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
import { AdminAuthenticationComponent } from './Admin/admin-authentication/admin-authentication.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { NavigationbarComponent } from './Layout/navigationbar/navigationbar.component';
import { SliderComponent } from './Layout/slider/slider.component';
import { HomeComponent } from './Users/home/home.component';
import { AdminAuthComponent } from './Admin/admin-auth/admin-auth.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    AdminAuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    NavigationbarComponent,
    SliderComponent,
    HomeComponent,
    AdminAuthComponent,
    AdminHomeComponent
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
