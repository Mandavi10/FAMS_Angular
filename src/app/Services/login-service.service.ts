import { Injectable,Inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient,HttpHeaders,HttpParams,HttpResponse} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';  
//import { error } from 'util';
import {Logindetails} from '../../Models/Login/logindetails'
import{EmailSent} from '../../Models/Login/email-sent';
import{Changepasswordres} from '../../Models/Login/changepasswordres';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
    baseUrl: string = ""; 
    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
        this.baseUrl = myAppUrl;
    }
    GetLogin(em:any): Observable<Logindetails> {
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<Logindetails>(this.baseUrl + 'api/Login/getlogindetails', body, {
        headers
    });
    }
    ForgotPassword(email): Observable<EmailSent> {
      return this._http.get<EmailSent>(this.baseUrl + 'api/Login/SentEmail/' + email);
    }

    Changepassword(Jsondata): Observable<Changepasswordres> {
      const body = Jsondata;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<Changepasswordres>(this.baseUrl + 'api/Login/Updatepassword/', body, {
        headers
    });
    }
    
    
errorHandler(error: Response) {  
  console.log(error);  
  return Observable.throw(error);  
}  

  }


