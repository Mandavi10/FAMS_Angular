import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalStatementViewComponent } from './capital-statement-view.component';

describe('CapitalStatementViewComponent', () => {
  let component: CapitalStatementViewComponent;
  let fixture: ComponentFixture<CapitalStatementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalStatementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalStatementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
