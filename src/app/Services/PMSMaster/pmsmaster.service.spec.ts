import { TestBed } from '@angular/core/testing';

import { PmsmasterService } from './pmsmaster.service';

describe('PmsmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmsmasterService = TestBed.get(PmsmasterService);
    expect(service).toBeTruthy();
  });
});
