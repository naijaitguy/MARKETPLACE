import { Component, OnInit } from '@angular/core';
import { AuthenticationServicesService } from 'src/app/Services/authentication-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private AuthService: AuthenticationServicesService, private route: Router) { }

  ngOnInit(): void {
  }

  LogOut(){
    localStorage.clear();
    this.AuthService.LogOutUser();
    this.route.navigate(['/']);
  }

}
