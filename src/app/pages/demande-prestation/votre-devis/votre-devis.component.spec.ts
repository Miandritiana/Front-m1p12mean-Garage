import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotreDevisComponent } from './votre-devis.component';

describe('VotreDevisComponent', () => {
  let component: VotreDevisComponent;
  let fixture: ComponentFixture<VotreDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotreDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotreDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
