import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionAutomatiqueComponent } from './admission-automatique.component';

describe('AdmissionAutomatiqueComponent', () => {
  let component: AdmissionAutomatiqueComponent;
  let fixture: ComponentFixture<AdmissionAutomatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionAutomatiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionAutomatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
