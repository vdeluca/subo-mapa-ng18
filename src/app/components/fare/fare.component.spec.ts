import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareComponent } from './fare.component';

describe('FareComponent', () => {
  let component: FareComponent;
  let fixture: ComponentFixture<FareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
