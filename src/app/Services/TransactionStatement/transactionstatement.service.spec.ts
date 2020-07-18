import { TestBed } from '@angular/core/testing';

import { TransactionstatementService } from './transactionstatement.service';

describe('TransactionstatementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionstatementService = TestBed.get(TransactionstatementService);
    expect(service).toBeTruthy();
  });
});
