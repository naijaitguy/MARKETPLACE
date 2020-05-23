import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';

@Component({
  selector: 'app-view-market',
  templateUrl: './view-market.component.html',
  styleUrls: ['./view-market.component.css']
})
export class ViewMarketComponent implements OnInit {


  public Markets;
 
  MktId ;

  Success = false;

  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService, private avRout: ActivatedRoute) {


   }


  ngOnInit(): void {

 this.GetSinglemarket();

  }



   GetSinglemarket(){

    const paramid = 'id';
    if (this.avRout.snapshot.params[paramid])
    {this.MktId = this.avRout.snapshot.params[paramid]; }
    this.Services.GetMarketById(this.MktId).subscribe(
      data => {  this.Markets = data;

                                                    }
);



   }



}
