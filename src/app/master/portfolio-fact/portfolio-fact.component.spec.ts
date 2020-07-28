import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFactComponent } from './portfolio-fact.component';

describe('PortfolioFactComponent', () => {
  let component: PortfolioFactComponent;
  let fixture: ComponentFixture<PortfolioFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
