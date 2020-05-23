import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';
import { MarketModel } from 'src/app/Model/MarketModel';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) { }
DeleteMgs = false;

Nomarket = true;
  public Markets:  MarketModel[];

  ngOnInit(): void {

   this.LoadData();
  }


Delete(id:any){

  if(confirm( "Are You Sure You Want To Delete Market Pamanently ?"))
  
  { 

this.Services.DeleteMarketById(id).subscribe(data=>{ this.DeleteMgs = true; this.LoadData(); })

  }

}

LoadData(){
 
  this.Services.GetAllMarket().subscribe(data => { if(data.length){ this.Nomarket = false;}
    this.Markets = data;},error=>{}
    );

}

}
