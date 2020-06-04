import { TestBed } from '@angular/core/testing';

import { PmsCustomerListService } from './pms-customer-list.service';

describe('PmsCustomerListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmsCustomerListService = TestBed.get(PmsCustomerListService);
    expect(service).toBeTruthy();
  });
});
