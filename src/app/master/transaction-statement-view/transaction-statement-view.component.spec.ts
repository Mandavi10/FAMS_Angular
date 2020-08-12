import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatementViewComponent } from './transaction-statement-view.component';

describe('TransactionStatementViewComponent', () => {
  let component: TransactionStatementViewComponent;
  let fixture: ComponentFixture<TransactionStatementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionStatementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
