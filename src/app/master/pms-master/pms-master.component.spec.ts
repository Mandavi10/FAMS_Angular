import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsMasterComponent } from './pms-master.component';

describe('PmsMasterComponent', () => {
  let component: PmsMasterComponent;
  let fixture: ComponentFixture<PmsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
