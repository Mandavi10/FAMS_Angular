import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachMandateComponent } from './nach-mandate.component';

describe('NachMandateComponent', () => {
  let component: NachMandateComponent;
  let fixture: ComponentFixture<NachMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
