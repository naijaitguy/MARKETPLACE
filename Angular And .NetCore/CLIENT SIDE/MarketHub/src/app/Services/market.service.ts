import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { MarketModel } from '../Model/MarketModel';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor( private Http: HttpClient) { }


  httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', ` bearer ${this.getToken()}`)};
  AddMarket(Market): Observable <MarketModel>  {
 return this.Http.post<any>(environment.ApiUrl + 'Market/AddMarket' , Market , this.httpOption ).pipe(retry(1), catchError(this.errorHandle));

  }

  GetAllMarket(): Observable <Array <MarketModel>> {

  return this.Http.get<Array< MarketModel>>( environment.ApiUrl + 'Market/GetAllMarket', this.httpOption)
  .pipe(retry(1), catchError(this.errorHandle));

  }


  GetMarketByName(MarketName): Observable <Array <MarketModel>> {

    return this.Http.get<Array< MarketModel>>( environment.ApiUrl + 'Market/GetMarketByName/' + MarketName , this.httpOption)
    .pipe(retry(1), catchError(this.errorHandle));

    }




  GetMarketByCategory(Category): Observable <Array <MarketModel>> {

    return this.Http.get<Array< MarketModel>>( environment.ApiUrl + 'Market/GetMarketByCategory/' + Category , this.httpOption)
    .pipe(retry(1), catchError(this.errorHandle));

    }





    GetMarketByLocation(Location): Observable <Array <MarketModel>> {

      return this.Http.get<Array< MarketModel>>( environment.ApiUrl + 'Market/GetMarketBylocation/' + Location, this.httpOption)
      .pipe(retry(1), catchError(this.errorHandle));

      }




  GetMarketById(maktId): Observable <MarketModel> {

    return this.Http.get< MarketModel>( environment.ApiUrl + 'Market/GetMarketById/' + maktId, this.httpOption);

    }

    
  DeleteMarketById(maktId): Observable <MarketModel> {

    return this.Http.get< MarketModel>( environment.ApiUrl + 'Market/DeleteMarket/' + maktId, this.httpOption);

    }


    UpdateMarket(maktId, MarketModel ): Observable <MarketModel> {

      return this.Http.post< MarketModel>( environment.ApiUrl + 'Market/UpdateMarket/' + maktId, MarketModel, this.httpOption);

      }

  errorHandle(error){
    let errormgs = '';
    if (error.error instanceof ErrorEvent){
        // get client side error

         errormgs = error.error.message;
    }
     else {

      // get server-side error
           errormgs = `Error Code :${error.status}\nMessage: ${error.message}`;

     }

    console.log(errormgs);
    return throwError(errormgs);

      }



getToken(){
  return localStorage.getItem('token');

}

}
