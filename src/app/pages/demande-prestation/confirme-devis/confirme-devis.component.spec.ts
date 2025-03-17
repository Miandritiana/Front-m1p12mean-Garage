import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeDevisComponent } from './confirme-devis.component';

describe('ConfirmeDevisComponent', () => {
  let component: ConfirmeDevisComponent;
  let fixture: ComponentFixture<ConfirmeDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmeDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmeDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
