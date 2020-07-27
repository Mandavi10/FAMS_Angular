import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAppraisalsComponent } from './portfolio-appraisals.component';

describe('PortfolioAppraisalsComponent', () => {
  let component: PortfolioAppraisalsComponent;
  let fixture: ComponentFixture<PortfolioAppraisalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioAppraisalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAppraisalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
