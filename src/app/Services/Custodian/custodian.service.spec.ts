import { TestBed } from '@angular/core/testing';

import { CustodianService } from './custodian.service';

describe('CustodianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustodianService = TestBed.get(CustodianService);
    expect(service).toBeTruthy();
  });
});
