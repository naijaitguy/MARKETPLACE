import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServicesService } from 'src/app/Services/authentication-services.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-authenication',
  templateUrl: './admin-authenication.component.html',
  styleUrls: ['./admin-authenication.component.css']
})
export class AdminAuthenicationComponent implements OnInit {

  Loading = false;
  FormData: FormGroup;
  Submitted = false;
  InvalidUser: any;
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(private route: Router, private Fb: FormBuilder, private AuthenticationServices: AuthenticationServicesService) {

  this.FormData = this.Fb.group({

    Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    Rememberme: ['']

  });

    }
    ngOnInit(): void {

      this.AuthenticationServices.LogOutUser();
    }

    get f(){ return this.FormData.controls; }
    ProcessForm(FormData){
    this.Submitted = true;
    if (!this.FormData.valid)
    { return false; }

    this.Loading = true;

    this.AuthenticationServices.AuthenticateAdmin(this.f.Email.value, this.f.Password.value).pipe(first())
     .subscribe( User => { this.route.navigate(['Admin/Home']); }
      , error => { this.InvalidUser = true; this.Loading = false; });


    }

  }
