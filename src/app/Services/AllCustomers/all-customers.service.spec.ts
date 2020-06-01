import { TestBed } from '@angular/core/testing';

import { AllCustomersService } from './all-customers.service';

describe('AllCustomersService', () => {
  let service: AllCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
