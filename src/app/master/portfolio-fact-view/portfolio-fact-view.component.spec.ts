import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFactViewComponent } from './portfolio-fact-view.component';

describe('PortfolioFactViewComponent', () => {
  let component: PortfolioFactViewComponent;
  let fixture: ComponentFixture<PortfolioFactViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioFactViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioFactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
