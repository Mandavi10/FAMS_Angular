import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationMasterComponent } from './designation-master.component';

describe('DesignationMasterComponent', () => {
  let component: DesignationMasterComponent;
  let fixture: ComponentFixture<DesignationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
