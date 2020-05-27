import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMandateComponent } from './download-mandate.component';

describe('DownloadMandateComponent', () => {
  let component: DownloadMandateComponent;
  let fixture: ComponentFixture<DownloadMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
