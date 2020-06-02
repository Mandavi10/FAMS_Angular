import { TestBed } from '@angular/core/testing';

import { TrialbalancereportService } from './trialbalancereport.service';

describe('TrialbalancereportService', () => {
  let service: TrialbalancereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialbalancereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
