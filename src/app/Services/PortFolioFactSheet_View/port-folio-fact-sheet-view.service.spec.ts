import { TestBed } from '@angular/core/testing';

import { PortFolioFactSheetViewService } from './port-folio-fact-sheet-view.service';

describe('PortFolioFactSheetViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortFolioFactSheetViewService = TestBed.get(PortFolioFactSheetViewService);
    expect(service).toBeTruthy();
  });
});
