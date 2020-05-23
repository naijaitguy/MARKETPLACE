import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';
import { MarketModel } from 'src/app/Model/MarketModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

SearchByCategoryError = false;

SearchByNameError = false;

SearchByLocationError = false;

SearchName;
Categorysearch;
LocationSearch;

public Markets: MarketModel[];

    constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) { }

    ngOnInit(): void {
      this.SearchName = localStorage.getItem('SearchName');
      this.Categorysearch = localStorage.getItem('catergory');
      this.LocationSearch = localStorage.getItem('location');


      if (this.GetSearchByNameValue() !== null) {
        this.Services.GetMarketByName(this.SearchName).subscribe(data => {
          this.Markets = data; localStorage.removeItem('SearchName'); },
           error => { this.SearchByNameError = true; localStorage.removeItem('SearchName'); }
          );
      } else{

              if (this.GetSearchByLocation() !== null){

                this.Services.GetMarketByLocation(this.LocationSearch).subscribe(
                  data => {this.Markets = data; localStorage.removeItem('location'); },
                   error => {this.SearchByLocationError = true; localStorage.removeItem('location'); });
              }

              else{ 
                
                if(this.GetSearchByCategory() !== null)
                {
                  this.Services.GetMarketByCategory(this.Categorysearch).subscribe(
                    data => {this.Markets = data; localStorage.removeItem('catergory'); },
                     error => {this.SearchByCategoryError = true; localStorage.removeItem('catergory'); });

                } 
                
                else{

                  this.Services.GetAllMarket().subscribe(data => {
                    this.Markets = data; }
                    );
                }
               }


    }
  }
    GetSearchByCategory(){
      return localStorage.getItem('catergory');

    }

    GetSearchByNameValue(){
 return localStorage.getItem('SearchName');

    }

    GetSearchByLocation(){

      return localStorage.getItem('location');
    }

  }
