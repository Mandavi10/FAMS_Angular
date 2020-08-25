import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeMasterDetailsComponent } from './scheme-master-details.component';

describe('SchemeMasterDetailsComponent', () => {
  let component: SchemeMasterDetailsComponent;
  let fixture: ComponentFixture<SchemeMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
