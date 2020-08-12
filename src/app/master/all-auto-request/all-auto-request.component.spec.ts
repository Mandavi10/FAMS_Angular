import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAutoRequestComponent } from './all-auto-request.component';

describe('AllAutoRequestComponent', () => {
  let component: AllAutoRequestComponent;
  let fixture: ComponentFixture<AllAutoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAutoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAutoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
