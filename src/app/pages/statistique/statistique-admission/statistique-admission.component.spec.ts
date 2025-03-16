import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueAdmissionComponent } from './statistique-admission.component';

describe('StatistiqueAdmissionComponent', () => {
  let component: StatistiqueAdmissionComponent;
  let fixture: ComponentFixture<StatistiqueAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiqueAdmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
