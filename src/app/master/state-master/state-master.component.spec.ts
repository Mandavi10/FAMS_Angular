import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterComponent } from './state-master.component';

describe('StateMasterComponent', () => {
  let component: StateMasterComponent;
  let fixture: ComponentFixture<StateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
