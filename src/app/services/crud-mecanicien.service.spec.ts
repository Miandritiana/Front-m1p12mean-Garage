import { TestBed } from '@angular/core/testing';

import { CrudMecanicienService } from './crud-mecanicien.service';

describe('CrudMecanicienService', () => {
  let service: CrudMecanicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudMecanicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
