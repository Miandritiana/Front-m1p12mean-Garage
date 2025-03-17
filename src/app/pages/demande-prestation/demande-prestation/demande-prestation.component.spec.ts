import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePrestationComponent } from './demande-prestation.component';

describe('DemandePrestationComponent', () => {
  let component: DemandePrestationComponent;
  let fixture: ComponentFixture<DemandePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandePrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
