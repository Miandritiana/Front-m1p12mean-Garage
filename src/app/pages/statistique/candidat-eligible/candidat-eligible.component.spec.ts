import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatEligibleComponent } from './candidat-eligible.component';

describe('CandidatEligibleComponent', () => {
  let component: CandidatEligibleComponent;
  let fixture: ComponentFixture<CandidatEligibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatEligibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
