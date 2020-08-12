import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoReportRequestComponent } from './auto-report-request.component';

describe('AutoReportRequestComponent', () => {
  let component: AutoReportRequestComponent;
  let fixture: ComponentFixture<AutoReportRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoReportRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoReportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
