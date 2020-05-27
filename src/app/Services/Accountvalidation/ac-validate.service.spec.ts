import { TestBed } from '@angular/core/testing';

import { AcValidateService } from './ac-validate.service';

describe('AcValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcValidateService = TestBed.get(AcValidateService);
    expect(service).toBeTruthy();
  });
});
