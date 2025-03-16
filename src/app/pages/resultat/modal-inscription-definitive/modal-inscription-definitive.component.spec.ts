import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInscriptionDefinitiveComponent } from './modal-inscription-definitive.component';

describe('ModalInscriptionDefinitiveComponent', () => {
  let component: ModalInscriptionDefinitiveComponent;
  let fixture: ComponentFixture<ModalInscriptionDefinitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInscriptionDefinitiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInscriptionDefinitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
