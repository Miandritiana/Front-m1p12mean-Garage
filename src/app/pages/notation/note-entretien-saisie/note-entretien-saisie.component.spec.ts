import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEntretienSaisieComponent } from './note-entretien-saisie.component';

describe('NoteEntretienSaisieComponent', () => {
  let component: NoteEntretienSaisieComponent;
  let fixture: ComponentFixture<NoteEntretienSaisieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteEntretienSaisieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteEntretienSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
