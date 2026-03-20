import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenListComponent } from './screen-list-component';

describe('ScreenListComponent', () => {
  let component: ScreenListComponent;
  let fixture: ComponentFixture<ScreenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
