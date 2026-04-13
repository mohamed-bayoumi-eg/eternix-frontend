import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeFormComponent } from './item-type-form-component';

describe('ItemTypeFormComponent', () => {
  let component: ItemTypeFormComponent;
  let fixture: ComponentFixture<ItemTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
