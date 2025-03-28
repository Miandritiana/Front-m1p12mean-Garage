import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousValideComponent } from './rendez-vous-valide.component';

describe('RendezVousValideComponent', () => {
  let component: RendezVousValideComponent;
  let fixture: ComponentFixture<RendezVousValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousValideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
