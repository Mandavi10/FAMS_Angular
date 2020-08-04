import { TestBed } from '@angular/core/testing';

import { PortfolioAppraisalsService } from './portfolio-appraisals.service';

describe('PortfolioAppraisalsService', () => {
  let service: PortfolioAppraisalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioAppraisalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
