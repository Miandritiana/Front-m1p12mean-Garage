import { TestBed } from '@angular/core/testing';

import { NoteConcoursService } from './note-concours.service';

describe('NoteConcoursService', () => {
  let service: NoteConcoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteConcoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
