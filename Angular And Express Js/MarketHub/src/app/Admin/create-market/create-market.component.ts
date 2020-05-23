import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/Services/user-services.service';
import {ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { MarketModel } from 'src/app/Model/MarketModel';
import { MarketService } from 'src/app/Services/market.service';

@Component({
  selector: 'app-create-market',
  templateUrl: './create-market.component.html',
  styleUrls: ['./create-market.component.css']
})
export class CreateMarketComponent implements OnInit {

  public progress: number;
  public message: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished1 = new EventEmitter();
  @Output() public onUploadFinished2 = new EventEmitter();
  @Output() public onUploadFinished3 = new EventEmitter();
  constructor(private fb: FormBuilder, private Route: Router, private Services: MarketService) { }

  Submitted = false ;
  Success = false;
  Loading = false ;
  FormData: FormGroup;
  upload1 = false;
  upload2 = false;
  upload3 = false;
  new = false;
	
  public response1: {dbPath: ''};
  public response2: {dbPath: ''};
  public response3: {dbPath: ''};

  public image1path;
  public image2path;
  public image3path;

  dis = false;

  ngOnInit(): void {

    this.FormData = this.fb.group({

      MarketName: ['', Validators.required],
      Category: ['' , Validators.required],
      Discription: ['', Validators.required],
      Location: ['', Validators.required]
    });




  }

  public uploadFinished1 = (event) => {
    this.response1 = event;
    this.getimage1();
  }
  public uploadFinished2 = (event) => {
    this.response2 = event;
    this.getimage2();
  }

  public uploadFinished3 = (event) => {
    this.response3 = event;
    this.getimage3();
  }

  get f(){ return this.FormData.controls; }


  ProcessForm(){

  this.dis = false;
       this.Submitted = true;
       if (this.FormData.invalid){ return false; }
       this.dis = true;
       this.upload1 = true;



      }


      getimage1(){
        this.image1path = this.response1.dbPath;


        this.upload2 = true;

      }


      getimage2(){
        this.image2path = this.response2.dbPath;


        this.upload3 = true;
      }


      getimage3(){
        this.image3path = this.response3.dbPath;

        this.SubmitData();
      }

      SubmitData(){

        const NewMarket = {

          Name: this.f.MarketName.value,
           Discription: this.f.Discription.value,
           Location: this.f.Location.value,
            Image1: this.image1path,
            Image2: this.image2path,
            Image3: this.image3path,
            Catergory: this.f.Category.value
        };

        this.Services.AddMarket(NewMarket).subscribe(
          data => {this.Route.navigate(['/Admin/Home']); }, error => {});

      }


}
