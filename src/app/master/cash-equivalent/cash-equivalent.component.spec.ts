import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEquivalentComponent } from './cash-equivalent.component';

describe('CashEquivalentComponent', () => {
  let component: CashEquivalentComponent;
  let fixture: ComponentFixture<CashEquivalentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashEquivalentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashEquivalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
