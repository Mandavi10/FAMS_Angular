import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAppraisalsViewComponent } from './portfolio-appraisals-view.component';

describe('PortfolioAppraisalsViewComponent', () => {
  let component: PortfolioAppraisalsViewComponent;
  let fixture: ComponentFixture<PortfolioAppraisalsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioAppraisalsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAppraisalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
