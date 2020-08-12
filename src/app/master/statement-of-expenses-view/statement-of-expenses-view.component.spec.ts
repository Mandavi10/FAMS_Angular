import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfExpensesViewComponent } from './statement-of-expenses-view.component';

describe('StatementOfExpensesViewComponent', () => {
  let component: StatementOfExpensesViewComponent;
  let fixture: ComponentFixture<StatementOfExpensesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementOfExpensesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfExpensesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
