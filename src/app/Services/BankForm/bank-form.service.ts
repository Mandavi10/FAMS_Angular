import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { CheckReference } from '../../../Models/BankForm/checkreference';
import { SaveData, EditData0 } from '../../../Models/BankForm/savedata';
import {AppSettings} from 'src/app/app-settings';
@Injectable({
  providedIn: 'root'
})
export class BankFormService {
     UserId: string = ""; EntityId: string = "";
   baseUrl: string = ""; 
    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
        
        this.baseUrl = AppSettings.SaveEditMandate_URL;
    }

    BinddataOnPageLoad(): Observable<any> {
      
        let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = Sessionvalue.UserId;
        this.EntityId = Sessionvalue.ReferenceId;
        var jasondata = {
            "UserId": this.UserId,
            "EntityId": this.EntityId            
        }
         const body = jasondata;
         const headers = new HttpHeaders().set('content-type', 'application/json');
       // return this._http.get<any>(this.baseUrl + 'api/SaveMandate/GetBankFormdata/'+ this.UserId + '/' + this.EntityId);
        return this._http.post<any>(this.baseUrl + 'api/SaveMandate/GetBankFormdata/', body, {
            headers 
        });
    }
    
    BindIFSC(BankName): Observable<any> {       
        return this._http.get<any>(this.baseUrl + 'api/SaveMandate/BindIFSC/' + BankName);
    }
    SaveData(jsondata,mandateid): Observable<any> {
        debugger;
        const body = jsondata;
       
        let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = Sessionvalue.UserId;
        this.EntityId = Sessionvalue.ReferenceId;
        var AppId=Sessionvalue.AppId;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<any>(this.baseUrl + 'api/SaveMandate/SaveData/'+ mandateid, body, {
            headers 
        });
    }

    Edit(mandateid): Observable<any> {
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
      
        return this._http.get<any>(this.baseUrl + 'api/BankForm/Edit/' + mandateid + '/' + this.UserId + '/' + this.EntityId);
           
       
    }
    CheckReference(em: any, mandateId, EntityId): Observable<CheckReference> {
        let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = Sessionvalue.UserId;
        this.EntityId = Sessionvalue.ReferenceId;
        const body = em;     
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<CheckReference>(this.baseUrl + 'api/BankForm/CheckReference/'+mandateId + '/' + EntityId , body, {
            headers
        });
    }
}
