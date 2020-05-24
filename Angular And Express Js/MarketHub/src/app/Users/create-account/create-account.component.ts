import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationServicesService } from 'src/app/Services/authentication-services.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {


  FormData: FormGroup;
  Submitted = false;
  Error = false;
  Loading = false;
  EmailError = false;
  PhoneError = false;
  UsernameError = false;
  Success = false;
  PwdError = false;


  unamePattern = '^[a-z0-9_-]{3,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder, private Userservice: AuthenticationServicesService) {
  this.FormData = this.fb.group({
  Email: ['', [Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]],
  Password: ['' , [Validators.compose([Validators.required, Validators.minLength(6)])]],
  UserName: ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
  FullName: ['', [Validators.compose([Validators.required])]],
  PhoneNumber: ['', [Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)] )]],
  Address: ['' , [Validators.compose([Validators.required])]],
  ConfirmPassword: ['', [Validators.compose([Validators.required, Validators.minLength(6)])]]

  });

  }
  ngOnInit(): void {
  }


  get f() { return this.FormData.controls; }

  ConfirmEmail(){

    if (this.f.Password.value !== this.f.ConfirmPassword.value){this.EmailError = true; }

  }



  FindUserName(){

    this.EmailError = false;
    this.PhoneError = false;
    this.UsernameError = false;
    this.Success = false;
    this.Loading = false;
let UserName = {UserName: this.f.UserName.value};


    return this.Userservice.GetUserByUsername(UserName).subscribe(
      data => {
                this.UsernameError = true; return; },

      error => { this.FindEmail(); });
  }


  FindEmail(){

    let UserEmail = {Email: this.f.Email.value};
    return this.Userservice.GetUserBYEmail(UserEmail).subscribe(
      data => {  this.EmailError = true; return; },
      error => { this.AddUser();  });

  }

  user(){

    const User =
    {Email: this.f.Email,
      Password: this.f.Password,

     Address: this.f.Address,
      PhoneNumber: this.f.PhoneNumber,
       UserName: this.f.UserName,
         FullName : this.f.FullName};


         return User;

  }

    ProcessForm(){
      this.Submitted = true;

      if (this.f.Password.value !== this.f.ConfirmPassword.value){  this.PwdError = true; return false; } else{
      if (this.FormData.invalid){  return false;  }

      this.Loading = true;
      this.FindUserName();

    }
  }
  AddUser(){


    this.Userservice.RegisterUser(this.user()).subscribe(
     data =>  {this.Success = true; },
     error => { this.Error = true; }

    );

  }



}
