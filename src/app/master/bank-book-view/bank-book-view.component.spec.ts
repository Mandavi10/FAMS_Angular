import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBookViewComponent } from './bank-book-view.component';

describe('BankBookViewComponent', () => {
  let component: BankBookViewComponent;
  let fixture: ComponentFixture<BankBookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankBookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
