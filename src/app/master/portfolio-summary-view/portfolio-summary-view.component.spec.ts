import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSummaryViewComponent } from './portfolio-summary-view.component';

describe('PortfolioSummaryViewComponent', () => {
  let component: PortfolioSummaryViewComponent;
  let fixture: ComponentFixture<PortfolioSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
