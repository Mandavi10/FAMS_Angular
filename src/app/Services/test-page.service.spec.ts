import { TestBed } from '@angular/core/testing';

import { TestPageService } from './test-page.service';

describe('TestPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestPageService = TestBed.get(TestPageService);
    expect(service).toBeTruthy();
  });
});
