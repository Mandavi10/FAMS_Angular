import { TestBed } from '@angular/core/testing';

import { BankbookService } from './bankbook.service';

describe('BankbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankbookService = TestBed.get(BankbookService);
    expect(service).toBeTruthy();
  });
});
