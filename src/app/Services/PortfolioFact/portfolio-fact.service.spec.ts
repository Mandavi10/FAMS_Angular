import { TestBed } from '@angular/core/testing';

import { PortfolioFactService } from './portfolio-fact.service';

describe('PortfolioFactService', () => {
  let service: PortfolioFactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioFactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
