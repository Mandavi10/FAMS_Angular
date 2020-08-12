import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPortfolioViewComponent } from './current-portfolio-view.component';

describe('CurrentPortfolioViewComponent', () => {
  let component: CurrentPortfolioViewComponent;
  let fixture: ComponentFixture<CurrentPortfolioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPortfolioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPortfolioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
