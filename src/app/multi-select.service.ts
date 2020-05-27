import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiSelectService {

 public cities = [
   {name: 'Option 1', value: 1},
   {name: 'Option 2', value: 3},
   {name: 'Option 3', value: 5},
   {name: 'Option 4', value: 6},
   {name: 'Option 5', value: 8},
   {name: 'Option 6', value: 11},
   {name: 'Option 7', value: 12},
 ]

 public Bank = [
  {name: 'HDFC0000001_HDFC Bank', value: 1},
  {name: 'ICIC0000723_ICICI Bank', value: 3}
]

  constructor(private httpClient: HttpClient) { }

  getCities(){
   return of(this.cities);
 }

 getBank(){
  return of(this.Bank);
    }

}