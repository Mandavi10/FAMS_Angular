import { TestBed } from '@angular/core/testing';

import { CapitalSatementService } from './capital-satement.service';

describe('CapitalSatementService', () => {
  let service: CapitalSatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalSatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
