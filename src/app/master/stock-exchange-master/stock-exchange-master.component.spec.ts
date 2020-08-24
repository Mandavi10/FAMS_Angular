import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExchangeMasterComponent } from './stock-exchange-master.component';

describe('StockExchangeMasterComponent', () => {
  let component: StockExchangeMasterComponent;
  let fixture: ComponentFixture<StockExchangeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockExchangeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExchangeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
