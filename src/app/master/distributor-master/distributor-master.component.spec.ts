import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorMasterComponent } from './distributor-master.component';

describe('DistributorMasterComponent', () => {
  let component: DistributorMasterComponent;
  let fixture: ComponentFixture<DistributorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
