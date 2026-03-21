import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListComponent } from './currency-list-component';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
