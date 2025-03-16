import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNoteValideComponent } from './liste-note-valide.component';

describe('ListeNoteValideComponent', () => {
  let component: ListeNoteValideComponent;
  let fixture: ComponentFixture<ListeNoteValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeNoteValideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeNoteValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
