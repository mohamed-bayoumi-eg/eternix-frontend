import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInputComponent } from './dynamic-input-component';

describe('DynamicInputComponent', () => {
  let component: DynamicInputComponent;
  let fixture: ComponentFixture<DynamicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
