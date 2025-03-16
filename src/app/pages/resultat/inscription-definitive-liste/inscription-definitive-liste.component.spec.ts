import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDefinitiveListeComponent } from './inscription-definitive-liste.component';

describe('InscriptionDefinitiveListeComponent', () => {
  let component: InscriptionDefinitiveListeComponent;
  let fixture: ComponentFixture<InscriptionDefinitiveListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDefinitiveListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDefinitiveListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
