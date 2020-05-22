import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

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
