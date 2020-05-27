import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmandateAnalysisComponent } from './emandate-analysis.component';

describe('EmandateAnalysisComponent', () => {
  let component: EmandateAnalysisComponent;
  let fixture: ComponentFixture<EmandateAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmandateAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmandateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
