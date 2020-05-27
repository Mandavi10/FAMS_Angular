import { Injectable,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      this.baseUrl =AppSettings.SaveUser_URL;
  }
  getData(EntityId): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/SaveUser/BindData/' + EntityId);
  }
}
