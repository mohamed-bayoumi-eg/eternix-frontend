import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeListComponent } from './item-type-list-component';

describe('ItemTypeListComponent', () => {
  let component: ItemTypeListComponent;
  let fixture: ComponentFixture<ItemTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
