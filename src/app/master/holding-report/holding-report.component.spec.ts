import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingReportComponent } from './holding-report.component';

describe('HoldingReportComponent', () => {
  let component: HoldingReportComponent;
  let fixture: ComponentFixture<HoldingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
