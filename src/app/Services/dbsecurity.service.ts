 import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient,HttpHeaders,HttpParams,HttpResponse} from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DbsecurityService {
   constructor() {  }
  Encrypt(value){
    var key = CryptoJS.enc.Utf8.parse('qw23er5fd44g6hjknb55vg34fg87m3do');
    var iv = CryptoJS.enc.Utf8.parse('q0123c48zdf9fdmm');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  Decrypt(value){
    var key = CryptoJS.enc.Utf8.parse('qw23er5fd44g6hjknb55vg34fg87m3do');
    var iv = CryptoJS.enc.Utf8.parse('q0123c48zdf9fdmm');
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }



}
