import { TestBed } from '@angular/core/testing';

import { VilleService } from '../service/ville.service';

describe('VilleService', () => {
  let service: VilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
