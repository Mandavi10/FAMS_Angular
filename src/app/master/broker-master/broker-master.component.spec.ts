import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMasterComponent } from './broker-master.component';

describe('BrokerMasterComponent', () => {
  let component: BrokerMasterComponent;
  let fixture: ComponentFixture<BrokerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
