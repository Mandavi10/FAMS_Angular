import { TestBed } from '@angular/core/testing';

import { StatementexpensesService } from './statementexpenses.service';

describe('StatementexpensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatementexpensesService = TestBed.get(StatementexpensesService);
    expect(service).toBeTruthy();
  });
});
