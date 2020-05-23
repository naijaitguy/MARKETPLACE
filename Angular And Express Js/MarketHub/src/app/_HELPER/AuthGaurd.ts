import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationServicesService } from '../Services/authentication-services.service';




@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

constructor( private AdminService: AuthenticationServicesService , private Router: Router){}

canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    if (this.AdminService.Isloggin()){
      this.AdminService.ReturnUrl = state.url;
      return true;

    } else{

   this.Router.navigate( [''], { queryParams: {ReturnUrl: state.url}});

    }


}




}
