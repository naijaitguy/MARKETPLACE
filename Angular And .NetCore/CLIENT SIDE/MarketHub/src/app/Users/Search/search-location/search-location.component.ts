import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  FormData: FormGroup;
  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) {

this.FormData = this.fb.group({

  Name: ['', Validators.required]
});

   }

  ngOnInit(): void {
  }



  ProcessForm(){
    if (this.FormData.invalid){ alert('Pls Select The Location You Wish to Search'); }
    else{
     
    localStorage.setItem('location', this.FormData.controls.Name.value);
    
    this.Route.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {this.Route.navigate(['/User/Home']); });
    
    
    }
}

}