import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListPageComponent } from './dynamic-list-page-component';

describe('DynamicListPageComponent', () => {
  let component: DynamicListPageComponent;
  let fixture: ComponentFixture<DynamicListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicListPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
