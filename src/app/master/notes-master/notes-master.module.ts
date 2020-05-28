import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesMasterComponent } from './notes-master.component';
import { NotesMasterRoutingModule } from './notes-master-routing.module';


@NgModule({
  declarations: [NotesMasterComponent],
  imports: [
    CommonModule,
    NotesMasterRoutingModule
  ]
})
export class NotesMasterModule { }
