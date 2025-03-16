import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilNoteConcoursComponent } from './seuil-note-concours.component';

describe('SeuilNoteConcoursComponent', () => {
  let component: SeuilNoteConcoursComponent;
  let fixture: ComponentFixture<SeuilNoteConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeuilNoteConcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeuilNoteConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
