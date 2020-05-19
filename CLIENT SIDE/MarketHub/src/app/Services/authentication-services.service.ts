import { Injectable, Output } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../Model/UserModel';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {

  constructor(private Http: HttpClient) { }

  ReturnUrl: string;

  httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', ` bearer ${this.getToken()}`)};
  /////// get  all users


 GetUserBYEmail(UserModel){

return this.Http.post(environment.ApiUrl + 'Identity/FindEmail', UserModel)
.pipe(retry(1), catchError(this.errorHandle));

 }

 GetUserByUsername(UserModel){
  return this.Http.post(environment.ApiUrl + 'Identity/FindUserName' , UserModel) 
  .pipe(retry(1), catchError(this.errorHandle));
 }

 GetUserByPhone(UserModel){
  return this.Http.post(environment.ApiUrl + 'Identity/FindPhone' , UserModel)
  .pipe(retry(1), catchError(this.errorHandle));
 }
/////// get user by the id number



  ////// Add New User

  RegisterUser(UserModel) {
return this.Http.post<UserModel>(environment.ApiUrl + 'Identity/CreateAccount', UserModel)
.pipe(retry(1), catchError(this.errorHandle));

  }

  UserLogin(Email: any , Password: any)
  {
   return this.Http.post<any>( environment.ApiUrl  + 'Identity/Authenticate ', { Email, Password})
   // tslint:disable-next-line: no-shadowed-variable
   .pipe(map(TaxRegModel => {
  if (TaxRegModel && TaxRegModel.Token)

  {
    this.saveToke(TaxRegModel.Token);
    localStorage.setItem('CurrentUser', JSON.stringify(TaxRegModel));
    return TaxRegModel;

  }

   } ),
    catchError(this.errorHandle) );

  }


  
  AuthenticateAdmin(Email: any , Password: any)
  {
   return this.Http.post<any>( environment.ApiUrl  + 'Identity/AuthenticateAdmin ', { Email, Password})
   // tslint:disable-next-line: no-shadowed-variable
   .pipe(map(TaxRegModel => {
  if (TaxRegModel && TaxRegModel.Token)

  {
    this.saveToke(TaxRegModel.Token);
    localStorage.setItem('CurrentUser', JSON.stringify(TaxRegModel));
    return TaxRegModel;

  }

   } ),
    catchError(this.errorHandle) );

  }



     // tslint:disable-next-line: no-shadowed-variable
     UpdateUser(id: number, TaxRegModel: any): Observable<UserModel>
  {
    console.log(TaxRegModel);
    return this.Http.put<UserModel>(environment.ApiUrl + 'taxregistration/UpdateUser/' + id, TaxRegModel, this.httpOption)
.pipe(retry(1),
 catchError(this.errorHandle));

      }



     LogOutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('CurrentUser');
  localStorage.clear();
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


      Isloggin(){
        if (this.getToken() !== null){
           return true;
        } else{ return false; }
        }
      DeleteUser(UserId){
     return this.Http.delete(environment.ApiUrl + 'taxregistration/Delete/' + UserId, this.httpOption)
     .pipe(retry(1), catchError(this.errorHandle));
      }

saveToke(token){

  localStorage.setItem('token', token);

}


getToken(){
  return localStorage.getItem('token');

}


}
