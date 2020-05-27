import { TestBed } from '@angular/core/testing';

import { BankvalidateService } from './bankvalidate.service';

describe('BankvalidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankvalidateService = TestBed.get(BankvalidateService);
    expect(service).toBeTruthy();
  });
});
