import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDetailsTableComponent } from './dynamic-details-table-component';

describe('DynamicDetailsTableComponent', () => {
  let component: DynamicDetailsTableComponent;
  let fixture: ComponentFixture<DynamicDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDetailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDetailsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
