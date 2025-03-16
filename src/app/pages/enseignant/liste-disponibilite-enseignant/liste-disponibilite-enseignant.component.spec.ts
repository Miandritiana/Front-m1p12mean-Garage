import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDisponibiliteEnseignantComponent } from './liste-disponibilite-enseignant.component';

describe('ListeDisponibiliteEnseignantComponent', () => {
  let component: ListeDisponibiliteEnseignantComponent;
  let fixture: ComponentFixture<ListeDisponibiliteEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDisponibiliteEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDisponibiliteEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
