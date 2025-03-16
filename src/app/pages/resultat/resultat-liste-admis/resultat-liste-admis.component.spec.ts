import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatListeAdmisComponent } from './resultat-liste-admis.component';

describe('ResultatListeAdmisComponent', () => {
  let component: ResultatListeAdmisComponent;
  let fixture: ComponentFixture<ResultatListeAdmisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatListeAdmisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatListeAdmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
