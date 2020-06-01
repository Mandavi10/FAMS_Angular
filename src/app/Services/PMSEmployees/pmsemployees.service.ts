import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class PmsemployeesService {
  UserId : any;
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
  BindGrid(): Observable<any> {  
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = Sessionvalue.UserId;
   return this._http.get<any>(this.baseUrl + 'api/PMSEmployees/BindGrid/'+ this.UserId);
}
SaveData(em:any){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = Sessionvalue.UserId;
   const body = em;
   const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/PMSEmployees/SaveData/'+  this.UserId, body, {
      headers 
  });
}
BindCustodian(): Observable<any> {  
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = Sessionvalue.UserId;
 return this._http.get<any>(this.baseUrl + 'api/PMSEmployees/BindCustodian/'+ this.UserId);
}
}
