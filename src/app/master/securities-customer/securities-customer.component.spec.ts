import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesCustomerComponent } from './securities-customer.component';

describe('SecuritiesCustomerComponent', () => {
  let component: SecuritiesCustomerComponent;
  let fixture: ComponentFixture<SecuritiesCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritiesCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritiesCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
