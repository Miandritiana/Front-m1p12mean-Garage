import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatListeComponent } from './resultat-liste.component';

describe('ResultatListeComponent', () => {
  let component: ResultatListeComponent;
  let fixture: ComponentFixture<ResultatListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
