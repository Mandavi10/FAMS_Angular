import { TestBed } from '@angular/core/testing';

import { PmsemployeesService } from './pmsemployees.service';

describe('PmsemployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmsemployeesService = TestBed.get(PmsemployeesService);
    expect(service).toBeTruthy();
  });
});
