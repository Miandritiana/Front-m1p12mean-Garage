import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDefinitiveComponent } from './inscription-definitive.component';

describe('InscriptionDefinitiveComponent', () => {
  let component: InscriptionDefinitiveComponent;
  let fixture: ComponentFixture<InscriptionDefinitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDefinitiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDefinitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
