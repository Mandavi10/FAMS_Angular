import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankBookComponent } from './bank-book.component';
import { BankBookRoutingModule } from './bank-book-routing.module';


@NgModule({
  declarations: [BankBookComponent],
  imports: [
    CommonModule,
    BankBookRoutingModule
  ]
})
export class BankBookModule { }
