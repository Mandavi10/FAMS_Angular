import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFFileUploadComponent } from './pdffile-upload.component';

describe('PDFFileUploadComponent', () => {
  let component: PDFFileUploadComponent;
  let fixture: ComponentFixture<PDFFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDFFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
