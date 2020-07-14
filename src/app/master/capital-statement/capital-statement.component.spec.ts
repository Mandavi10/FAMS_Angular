import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalStatementComponent } from './capital-statement.component';

describe('CapitalStatementComponent', () => {
  let component: CapitalStatementComponent;
  let fixture: ComponentFixture<CapitalStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
