import { TestBed } from '@angular/core/testing';

import { SummaryreportService } from './summaryreport.service';

describe('SummaryreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryreportService = TestBed.get(SummaryreportService);
    expect(service).toBeTruthy();
  });
});
