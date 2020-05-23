import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {


  Submitted = false;
  FormData: FormGroup;
  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) {

this.FormData = this.fb.group({

  Name: ['', Validators.required]
});

   }

  ngOnInit(): void {
  }



  ProcessForm(){
    if (this.FormData.invalid){ alert('Pls Select Category You Wish to Search'); }
    else{

    localStorage.setItem('catergory', this.FormData.controls.Name.value);

    this.Route.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {this.Route.navigate(['/User/Home']); });


    }
}

}
