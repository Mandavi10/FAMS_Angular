import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEmandateComponent } from './bulk-emandate.component';

describe('BulkEmandateComponent', () => {
  let component: BulkEmandateComponent;
  let fixture: ComponentFixture<BulkEmandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEmandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEmandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
