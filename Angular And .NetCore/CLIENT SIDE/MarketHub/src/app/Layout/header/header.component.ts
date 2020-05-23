import { Component, OnInit } from '@angular/core';
import { AuthenticationServicesService } from 'src/app/Services/authentication-services.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/UserModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
UserName;
  constructor(private AuthService: AuthenticationServicesService, private route: Router) { }

  ngOnInit(): void {

   this.UserName =  localStorage.getItem("UserName");

  }

  LogOut(){
    localStorage.clear();
    this.AuthService.LogOutUser();
    this.route.navigate(['/']);
  }

  

}
