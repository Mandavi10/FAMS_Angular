import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeMasterComponent } from './scheme-master.component';

describe('SchemeMasterComponent', () => {
  let component: SchemeMasterComponent;
  let fixture: ComponentFixture<SchemeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
