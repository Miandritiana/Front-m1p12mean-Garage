import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeFicheComponent } from './programme-fiche.component';

describe('ProgrammeFicheComponent', () => {
  let component: ProgrammeFicheComponent;
  let fixture: ComponentFixture<ProgrammeFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeFicheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
