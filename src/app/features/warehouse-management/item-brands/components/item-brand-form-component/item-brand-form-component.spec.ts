import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBrandFormComponent } from './item-brand-form-component';

describe('ItemBrandFormComponent', () => {
  let component: ItemBrandFormComponent;
  let fixture: ComponentFixture<ItemBrandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBrandFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemBrandFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
