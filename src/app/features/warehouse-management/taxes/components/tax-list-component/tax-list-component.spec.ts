import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxListComponent } from './tax-list-component';

describe('TaxListComponent', () => {
  let component: TaxListComponent;
  let fixture: ComponentFixture<TaxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
