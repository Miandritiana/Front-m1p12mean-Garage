import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteEnseignantComponent } from './disponibilite-enseignant.component';

describe('DisponibiliteEnseignantComponent', () => {
  let component: DisponibiliteEnseignantComponent;
  let fixture: ComponentFixture<DisponibiliteEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibiliteEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibiliteEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
