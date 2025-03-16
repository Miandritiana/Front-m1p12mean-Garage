import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueApercuComponent } from './historique-apercu.component';

describe('HistoriqueApercuComponent', () => {
  let component: HistoriqueApercuComponent;
  let fixture: ComponentFixture<HistoriqueApercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueApercuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
