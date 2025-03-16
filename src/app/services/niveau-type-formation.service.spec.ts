import { TestBed } from '@angular/core/testing';

import { NiveauTypeFormationService } from './niveau-type-formation.service';

describe('NiveauTypeFormationService', () => {
  let service: NiveauTypeFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveauTypeFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
