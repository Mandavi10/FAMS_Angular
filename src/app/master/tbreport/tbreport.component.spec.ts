import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TBReportComponent } from './tbreport.component';

describe('TBReportComponent', () => {
  let component: TBReportComponent;
  let fixture: ComponentFixture<TBReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TBReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TBReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
