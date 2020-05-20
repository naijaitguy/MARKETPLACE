import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './Users/authentication/authentication.component';
import { CreateAccountComponent } from './Users/create-account/create-account.component';

import { HomeComponent } from './Users/home/home.component';
import { AdminAuthenicationComponent } from './Admin/admin-authenication/admin-authenication.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AddFoodcatergoryComponent } from './Admin/add-foodcatergory/add-foodcatergory.component';
import { CreateMarketComponent } from './Admin/create-market/create-market.component';
import { ManageAccountComponent } from './Admin/manage-account/manage-account.component';
import { ViewMarketComponent } from './Admin/view-market/view-market.component';
import { EditMarketComponent } from './Admin/edit-market/edit-market.component';
import { ContactComponent } from './Admin/contact/contact.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { AboutComponent } from './Admin/about/about.component';
import { UploadComponent } from './Admin/upload/upload.component';



// /Admin/ViewMarket
const routes: Routes = [
  {path: '', component: AuthenticationComponent, pathMatch: 'full'},
  {path : 'User' , component: AuthenticationComponent},
  {path : 'User/CreateAccount' , component: CreateAccountComponent},
  {path : 'Admin' , component: AdminAuthenicationComponent},
  {path : 'Contact' , component: ContactComponent},
  {path : 'About' , component:  AboutComponent},
  {path : 'Admin/Profile' , component: AdminProfileComponent},
  {path : 'Admin/Upload' , component: UploadComponent },
  {path : 'User/Home' , component: HomeComponent},
  {path : 'Admin/Home' , component: AdminHomeComponent},
  {path : 'Admin/CreateMarket' , component: CreateMarketComponent},
  {path : 'User/ManageAccount' , component:  ManageAccountComponent},
  {path : 'Admin/ViewMarket/:id' , component: ViewMarketComponent},
  {path : 'Admin/EditMarket/:id' , component: EditMarketComponent},
  {path : 'Admin/AddFoodcategory' , component: AddFoodcatergoryComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
