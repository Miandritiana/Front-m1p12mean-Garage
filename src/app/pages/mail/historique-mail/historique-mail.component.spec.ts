import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMailComponent } from './historique-mail.component';

describe('HistoriqueMailComponent', () => {
  let component: HistoriqueMailComponent;
  let fixture: ComponentFixture<HistoriqueMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
