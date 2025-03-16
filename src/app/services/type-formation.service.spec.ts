import { TestBed } from '@angular/core/testing';

import { TypeFormationService } from './type-formation.service';

describe('TypeFormationService', () => {
  let service: TypeFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
