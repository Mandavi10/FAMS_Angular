import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMSEmployeesComponent } from './pmsemployees.component';

describe('PMSEmployeesComponent', () => {
  let component: PMSEmployeesComponent;
  let fixture: ComponentFixture<PMSEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMSEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMSEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
