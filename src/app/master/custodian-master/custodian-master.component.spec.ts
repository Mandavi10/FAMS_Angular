import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodianMasterComponent } from './custodian-master.component';

describe('CustodianMasterComponent', () => {
  let component: CustodianMasterComponent;
  let fixture: ComponentFixture<CustodianMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustodianMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustodianMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
