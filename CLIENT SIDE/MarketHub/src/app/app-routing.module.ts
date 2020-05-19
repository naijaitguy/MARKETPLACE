import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './Users/authentication/authentication.component';
import { CreateAccountComponent } from './Users/create-account/create-account.component';
import { AdminAuthenticationComponent } from './Admin/admin-authentication/admin-authentication.component';
import { HomeComponent } from './Users/home/home.component';


// 
const routes: Routes = [
  {path: '', component: AuthenticationComponent, pathMatch: 'full'},
  {path : 'User' , component: AuthenticationComponent},
  {path : 'User/CreateAccount' , component: CreateAccountComponent},
  {path : 'Admin' , component: AdminAuthenticationComponent},
  {path : 'User/Home' , component: HomeComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
