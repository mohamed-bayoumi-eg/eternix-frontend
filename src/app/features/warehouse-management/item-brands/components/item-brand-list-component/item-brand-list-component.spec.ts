import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBrandListComponent } from './item-brand-list-component';

describe('ItemBrandListComponent', () => {
  let component: ItemBrandListComponent;
  let fixture: ComponentFixture<ItemBrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBrandListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemBrandListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
