import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationServicesService } from '../Services/authentication-services.service';




@Injectable({providedIn: 'root'})
export class UserGaurd implements CanActivate{

constructor( private UserService: AuthenticationServicesService, private Router: Router){}

canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    if (this.UserService.AdminIsloggin()){
      this.UserService.ReturnUrl = state.url;
      return true;

    } else{

   this.Router.navigate( ['/Admin'], { queryParams: {ReturnUrl: state.url}});

    }


}




}
