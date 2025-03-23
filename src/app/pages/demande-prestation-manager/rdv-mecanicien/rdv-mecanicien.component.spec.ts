import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvMecanicienComponent } from './rdv-mecanicien.component';

describe('RdvMecanicienComponent', () => {
  let component: RdvMecanicienComponent;
  let fixture: ComponentFixture<RdvMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
