import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AppSettings} from 'src/app/app-settings';

// import 'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) { 
    this.baseUrl = AppSettings.Login_URL;      


  }

  BindSidebarLinks(data): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/LinkSetup/GetLinks/', data, {
        headers 
    });
    }
}
