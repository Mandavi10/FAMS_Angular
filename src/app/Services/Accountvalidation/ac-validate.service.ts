import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';
import {AcValidateModal} from '../../../Models/AccountValidation/ac-validate-modal'
import {ResDescription} from '../../../Models/AccountValidation/ac-validate-modal'
import {ResCust1} from '../../../Models/AccountValidation/ac-validate-modal'
import {ResIfsc} from '../../../Models/AccountValidation/ac-validate-modal'
import {Resshow} from '../../../Models/AccountValidation/ac-validate-modal'
@Injectable({
  providedIn: 'root'
})
export class AcValidateService {

  UserId: string = ""; EntityId: string = "";
  baseUrl: string = ""; 
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {        
    this.baseUrl = AppSettings.AccountValidate_URL;
}

Accountvalidation (Jsondata): Observable<any> {
    const body = Jsondata;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/Accountvalidation/Accountvalidation/', body, {
      headers
  });
  }
}

