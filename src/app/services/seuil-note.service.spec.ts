import { TestBed } from '@angular/core/testing';

import { SeuilNoteService } from './seuil-note.service';

describe('SeuilNoteService', () => {
  let service: SeuilNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeuilNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
