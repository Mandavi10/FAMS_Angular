import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDividendComponent } from './statement-dividend.component';

describe('StatementDividendComponent', () => {
  let component: StatementDividendComponent;
  let fixture: ComponentFixture<StatementDividendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementDividendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDividendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
