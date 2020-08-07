import { TestBed } from '@angular/core/testing';

import { SchemamasterService } from './schemamaster.service';

describe('SchemamasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchemamasterService = TestBed.get(SchemamasterService);
    expect(service).toBeTruthy();
  });
});
