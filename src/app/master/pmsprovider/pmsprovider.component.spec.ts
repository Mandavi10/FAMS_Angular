import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMSProviderComponent } from './pmsprovider.component';

describe('PMSProviderComponent', () => {
  let component: PMSProviderComponent;
  let fixture: ComponentFixture<PMSProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMSProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMSProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
