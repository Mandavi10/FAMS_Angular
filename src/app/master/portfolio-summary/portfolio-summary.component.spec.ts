import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSummaryComponent } from './portfolio-summary.component';

describe('PortfolioSummaryComponent', () => {
  let component: PortfolioSummaryComponent;
  let fixture: ComponentFixture<PortfolioSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
