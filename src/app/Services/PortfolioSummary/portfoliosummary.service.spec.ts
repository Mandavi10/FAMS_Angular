import { TestBed } from '@angular/core/testing';

import { PortfoliosummaryService } from './portfoliosummary.service';

describe('PortfoliosummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfoliosummaryService = TestBed.get(PortfoliosummaryService);
    expect(service).toBeTruthy();
  });
});
