import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AllCustomersService {

  UserId : any;
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
  BindGrid(): Observable<any> {  
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = Sessionvalue.UserId;
   return this._http.get<any>(this.baseUrl + 'api/AllCustomer/BindGrid/'+ this.UserId);
}

SaveData(em:any){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = Sessionvalue.UserId;
   const body = em;
   const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/InsertCustomerDetails/'+  this.UserId, body, {
      headers 
  });
}

UpdateData(em:any,CustomerId){
  let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = Sessionvalue.UserId;
   const body = em;
   const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/AllCustomer/UpdateCustomerDetails/'+  this.UserId + '/'+  CustomerId, body, {
      headers 
  });
}






  // UserId : any;
  // baseUrl: string = ""; 
  // constructor(private _http:HttpClient, @Inject('Base_URL') myappUrl:string) 
  // { 
  //   this.baseUrl=AppSettings.Login_URL;
  // }

  // BindGrid():Observable<any>
  // {
  //   //debugger;
  //   let sessionvalue= JSON.parse(sessionStorage.getItem('User'));
  //   this.UserId= sessionvalue.UserId;
  //   return this._http.get<any>(this.baseUrl+'api/AllCustomer/BindGrid'+this.UserId);
  // }
}
