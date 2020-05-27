import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMasterComponent } from './region-master.component';

describe('RegionMasterComponent', () => {
  let component: RegionMasterComponent;
  let fixture: ComponentFixture<RegionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
