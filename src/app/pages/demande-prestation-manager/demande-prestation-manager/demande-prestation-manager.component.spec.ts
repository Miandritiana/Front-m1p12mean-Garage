import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePrestationManagerComponent } from './demande-prestation-manager.component';

describe('DemandePrestationManagerComponent', () => {
  let component: DemandePrestationManagerComponent;
  let fixture: ComponentFixture<DemandePrestationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandePrestationManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandePrestationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
