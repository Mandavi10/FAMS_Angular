import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesMasterComponent } from './notes-master.component';
import { NotesMasterRoutingModule } from './notes-master-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [NotesMasterComponent],
  imports: [
    CommonModule,
    NotesMasterRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class NotesMasterModule { }
