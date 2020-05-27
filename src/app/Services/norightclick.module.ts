import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NorightclickDirective}from './norightclick.directive';
@NgModule({
  declarations: [NorightclickDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NorightclickDirective
  ]
})
export class NorightclickModule { }
