import { Injectable, Output } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../Model/UserModel';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor( private Http: HttpClient) { }


  httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', ` bearer ${this.getToken()}`)};
  GetAllUser(): Observable<Array<UserModel>>
  {
     return this.Http.get<Array<UserModel>>(environment.ApiUrl + 'taxregistration/getall' , this.httpOption)
     .pipe(retry(1),
     catchError(this.errorHandle));

  }

  GetUserById(Id: number): Observable<UserModel> {

    return this.Http.get<UserModel>(environment.ApiUrl + 'taxregistration/getbyid/' + Id , this.httpOption)
    .pipe(retry(1),
    catchError(this.errorHandle));
  }


  getToken(){
    return localStorage.getItem('token');
  
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

}
