import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfExpensesComponent } from './statement-of-expenses.component';

describe('StatementOfExpensesComponent', () => {
  let component: StatementOfExpensesComponent;
  let fixture: ComponentFixture<StatementOfExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementOfExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
