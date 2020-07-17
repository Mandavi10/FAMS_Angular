import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookComponent } from './bank-book.component';

describe('BankBookComponent', () => {
  let component: BankBookComponent;
  let fixture: ComponentFixture<BankBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
