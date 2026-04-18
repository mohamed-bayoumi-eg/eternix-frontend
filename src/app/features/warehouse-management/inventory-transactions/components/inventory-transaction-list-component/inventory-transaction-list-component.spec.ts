import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransactionListComponent } from './inventory-transaction-list-component';

describe('InventoryTransactionListComponent', () => {
  let component: InventoryTransactionListComponent;
  let fixture: ComponentFixture<InventoryTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTransactionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTransactionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
