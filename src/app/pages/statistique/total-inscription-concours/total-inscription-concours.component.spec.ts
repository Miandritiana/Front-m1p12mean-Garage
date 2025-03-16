import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalInscriptionConcoursComponent } from './total-inscription-concours.component';

describe('TotalInscriptionConcoursComponent', () => {
  let component: TotalInscriptionConcoursComponent;
  let fixture: ComponentFixture<TotalInscriptionConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalInscriptionConcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalInscriptionConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
