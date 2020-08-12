import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDividendViewComponent } from './statement-dividend-view.component';

describe('StatementDividendViewComponent', () => {
  let component: StatementDividendViewComponent;
  let fixture: ComponentFixture<StatementDividendViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementDividendViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDividendViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
