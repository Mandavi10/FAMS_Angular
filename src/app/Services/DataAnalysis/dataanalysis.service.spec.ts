import { TestBed } from '@angular/core/testing';

import { DataanalysisService } from './dataanalysis.service';

describe('DataanalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataanalysisService = TestBed.get(DataanalysisService);
    expect(service).toBeTruthy();
  });
});
