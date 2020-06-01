import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNotesComponent } from './my-notes.component';
import { MynotesRoutingModule } from './my-notes-routing.module';


@NgModule({
  declarations: [MyNotesComponent],
  imports: [
    CommonModule,
    MynotesRoutingModule
  ]
})
export class MynotesModule { }
