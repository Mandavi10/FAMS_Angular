import { TestBed } from '@angular/core/testing';

import { DataanalysisService } from './dataanalysis.service';

describe('DataanalysisService', () => {
  let service: DataanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
