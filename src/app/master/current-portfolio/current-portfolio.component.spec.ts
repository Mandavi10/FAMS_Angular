import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPortfolioComponent } from './current-portfolio.component';

describe('CurrentPortfolioComponent', () => {
  let component: CurrentPortfolioComponent;
  let fixture: ComponentFixture<CurrentPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
