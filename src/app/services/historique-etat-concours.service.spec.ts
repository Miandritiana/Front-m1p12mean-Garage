import { TestBed } from '@angular/core/testing';

import { HistoriqueEtatConcoursService } from './historique-etat-concours.service';

describe('HistoriqueEtatConcoursService', () => {
  let service: HistoriqueEtatConcoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueEtatConcoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
