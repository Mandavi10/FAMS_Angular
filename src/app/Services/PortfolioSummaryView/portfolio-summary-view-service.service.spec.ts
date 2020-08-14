import { TestBed } from '@angular/core/testing';

import { PortfolioSummaryViewServiceService } from './portfolio-summary-view-service.service';

describe('PortfolioSummaryViewServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfolioSummaryViewServiceService = TestBed.get(PortfolioSummaryViewServiceService);
    expect(service).toBeTruthy();
  });
});
