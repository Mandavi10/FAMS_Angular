import { TestBed } from '@angular/core/testing';

import { CurrentportfolioService } from './currentportfolio.service';

describe('CurrentportfolioService', () => {
  let service: CurrentportfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentportfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
