import { TestBed } from '@angular/core/testing';

import { StatementDividentService } from './statement-divident.service';

describe('StatementDividentService', () => {
  let service: StatementDividentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementDividentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
