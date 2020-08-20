import { TestBed } from '@angular/core/testing';

import { AutoreportrequestService } from './autoreportrequest.service';

describe('AutoreportrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoreportrequestService = TestBed.get(AutoreportrequestService);
    expect(service).toBeTruthy();
  });
});
