import { TestBed } from '@angular/core/testing';

import { TbstructureService } from './tbstructure.service';

describe('TbstructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TbstructureService = TestBed.get(TbstructureService);
    expect(service).toBeTruthy();
  });
});
