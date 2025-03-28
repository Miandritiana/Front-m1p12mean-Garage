import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoPrestationComponent } from './histo-prestation.component';

describe('HistoPrestationComponent', () => {
  let component: HistoPrestationComponent;
  let fixture: ComponentFixture<HistoPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoPrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
