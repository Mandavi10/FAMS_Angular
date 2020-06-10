import { TestBed } from '@angular/core/testing';

import { MynotesService } from './mynotes.service';

describe('MynotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MynotesService = TestBed.get(MynotesService);
    expect(service).toBeTruthy();
  });
});
