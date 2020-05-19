import { Component, OnInit } from '@angular/core';
import { AuthenticationServicesService } from 'src/app/Services/authentication-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(private AuthService: AuthenticationServicesService, private route: Router) { }

  ngOnInit(): void {
  }

  
  LogOut(){
    localStorage.clear();
    this.AuthService.LogOutUser();
    this.route.navigate(['Admin']);
  }

}
