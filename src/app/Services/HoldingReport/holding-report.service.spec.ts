import { TestBed } from '@angular/core/testing';

import { HoldingReportService } from './holding-report.service';

describe('HoldingReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoldingReportService = TestBed.get(HoldingReportService);
    expect(service).toBeTruthy();
  });
});
