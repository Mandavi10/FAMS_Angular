import { TestBed } from '@angular/core/testing';

import { NotemasterService } from './notemaster.service';

describe('NotemasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotemasterService = TestBed.get(NotemasterService);
    expect(service).toBeTruthy();
  });
});
