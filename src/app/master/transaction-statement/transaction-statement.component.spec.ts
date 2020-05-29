import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatementComponent } from './transaction-statement.component';

describe('TransactionStatementComponent', () => {
  let component: TransactionStatementComponent;
  let fixture: ComponentFixture<TransactionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
