import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorMasterComponent } from './sector-master.component';

describe('SectorMasterComponent', () => {
  let component: SectorMasterComponent;
  let fixture: ComponentFixture<SectorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
