import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/Services/market.service';
import { MarketModel } from 'src/app/Model/MarketModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-market',
  templateUrl: './edit-market.component.html',
  styleUrls: ['./edit-market.component.css']
})
export class EditMarketComponent implements OnInit {


  public Markets;
  FormData: FormGroup;
  Submitted = false;
  MktId ;

  Success = false;

  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService, private avRout: ActivatedRoute) {

this.FormData = this.fb.group({

  Name: ['', Validators.required ],
  Discription: ['', Validators.required],
  Catergory: ['', Validators.required],
  Location: ['', Validators.required],
});





   }


  ngOnInit(): void {

 this.GetSinglemarket();

  }


   get f(){ return this.FormData.controls; }

   ProcessForm(){

    this.Submitted = true;
if(this.FormData.invalid){ return false;}

this.Services.UpdateMarket(this.MktId,this.FormData.value)
.subscribe(
  data =>{ this.Success = true; this.GetSinglemarket()},
  error=>{})

   }

   GetSinglemarket(){

    const paramid = 'id';
    if (this.avRout.snapshot.params[paramid])
    {this.MktId = this.avRout.snapshot.params[paramid]; }
    this.Services.GetMarketById(this.MktId).subscribe(
      data => {  this.Markets = data;

                 this.FormData.controls.Name.setValue(data.Name);
                 this.FormData.controls.Discription.setValue(data.Discription);

                 this.FormData.controls.Location.setValue(data.Location);
                                                    }
);



   }



}
