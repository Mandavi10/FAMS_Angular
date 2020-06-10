import { Injectable , Inject } from '@angular/core';
import {AppSettings} from 'src/app/app-settings';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import{DbsecurityService}from '../../Services/dbsecurity.service';

@Injectable({
  providedIn: 'root'
})
export class NotemasterService {
  baseUrl: string = ""; 
  constructor(private Dbsecurity: DbsecurityService,private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {   
      this.baseUrl = AppSettings.Login_URL;
  }
  BindGrid(em:any): Observable<any> { 
    const body = em; 
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/NoteMaster/BindGrid', body, {
      headers 
  });
}
SaveData(em:any): Observable<any> { 
  const body = em; 
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/NoteMaster/SaveData', body, {
    headers 
});
}
}