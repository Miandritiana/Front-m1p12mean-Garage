import { TestBed } from '@angular/core/testing';

import { ConcoursEnseignantDispatchService } from './concours-enseignant-dispatch.service';

describe('ConcoursEnseignantDispatchService', () => {
  let service: ConcoursEnseignantDispatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcoursEnseignantDispatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
