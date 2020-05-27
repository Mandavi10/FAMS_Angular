import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import {AppSettings} from 'src/app/app-settings';
import {BankvalidateModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {MICRResultModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {BankNameModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {MandateDataModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {MandateActivityDataModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {IsLiveInNACHModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {EMandateDataModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {EMandateTypeDataModal} from '../../../Models/BankValidation/bankvalidate-modal';
import {PostJsondata} from '../../../Models/BankValidation/bankvalidate-modal';

@Injectable({
  providedIn: 'root'
})
export class BankvalidateService {
  UserId: string = ""; EntityId: string = "";
  baseUrl: string = ""; 

  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {        
    this.baseUrl = AppSettings.BankValidate_URL;
}
BankValidation(Jsondata): Observable<any> {
  const body = Jsondata;
  const headers = new HttpHeaders().set('content-type', 'application/json');
  return this._http.post<any>(this.baseUrl + 'api/BankValidation/BankValidation/', body, {
    headers
});
}

}
