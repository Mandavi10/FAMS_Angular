import { TestBed } from '@angular/core/testing';

import { LoginServiceService } from './login-service.service';

describe('EmployeeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: LoginServiceService = TestBed.get(LoginServiceService);
    expect(service).toBeTruthy();
  });
});
