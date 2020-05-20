import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserServicesService } from 'src/app/Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor( private fb: FormBuilder, private Services: UserServicesService, route: Router) { }

  Submitted = false;
  Loading = false;

  ngOnInit(): void {
  }



  ProcessForm(){
this.Submitted = true;


  }
}
