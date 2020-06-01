import { TestBed } from '@angular/core/testing';

import { SecurityDetailsService } from './security-details.service';

describe('SecurityDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityDetailsService = TestBed.get(SecurityDetailsService);
    expect(service).toBeTruthy();
  });
});
