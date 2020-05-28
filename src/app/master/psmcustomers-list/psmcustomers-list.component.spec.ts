import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PSMCustomersListComponent } from './psmcustomers-list.component';

describe('PSMCustomersListComponent', () => {
  let component: PSMCustomersListComponent;
  let fixture: ComponentFixture<PSMCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PSMCustomersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PSMCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
