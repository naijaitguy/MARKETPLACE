import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';
import { MarketModel } from 'src/app/Model/MarketModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-market',
  templateUrl: './edit-market.component.html',
  styleUrls: ['./edit-market.component.css']
})
export class EditMarketComponent implements OnInit {

  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) { }

  public Markets:  MarketModel;

  ngOnInit(): void {


    var id = 4;
    this.Services.GetMarketById(id).subscribe(data => { console.log(data);
    this.Markets = data;}
    );
  }



}
