import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMasterComponent } from './country-master.component';

describe('CountryMasterComponent', () => {
  let component: CountryMasterComponent;
  let fixture: ComponentFixture<CountryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
