import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatInterresseComponent } from './candidat-interresse.component';

describe('CandidatInterresseComponent', () => {
  let component: CandidatInterresseComponent;
  let fixture: ComponentFixture<CandidatInterresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatInterresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatInterresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
