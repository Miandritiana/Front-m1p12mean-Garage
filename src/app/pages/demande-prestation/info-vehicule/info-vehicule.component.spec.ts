import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVehiculeComponent } from './info-vehicule.component';

describe('InfoVehiculeComponent', () => {
  let component: InfoVehiculeComponent;
  let fixture: ComponentFixture<InfoVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
