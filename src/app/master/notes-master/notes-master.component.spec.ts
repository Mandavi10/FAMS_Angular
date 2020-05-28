import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMasterComponent } from './notes-master.component';

describe('NotesMasterComponent', () => {
  let component: NotesMasterComponent;
  let fixture: ComponentFixture<NotesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
