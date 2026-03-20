import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchFormComponent } from './branch-form-component';

describe('BranchFormComponent', () => {
  let component: BranchFormComponent;
  let fixture: ComponentFixture<BranchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
