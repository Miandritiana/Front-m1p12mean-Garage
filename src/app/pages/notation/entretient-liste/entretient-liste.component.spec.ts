import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretientListeComponent } from './entretient-liste.component';

describe('EntretientListeComponent', () => {
  let component: EntretientListeComponent;
  let fixture: ComponentFixture<EntretientListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntretientListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretientListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
