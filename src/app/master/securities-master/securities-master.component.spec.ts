import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesMasterComponent } from './securities-master.component';

describe('SecuritiesMasterComponent', () => {
  let component: SecuritiesMasterComponent;
  let fixture: ComponentFixture<SecuritiesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritiesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritiesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
