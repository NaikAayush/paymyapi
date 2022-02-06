import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevAddPlanComponent } from './dev-add-plan.component';

describe('DevAddPlanComponent', () => {
  let component: DevAddPlanComponent;
  let fixture: ComponentFixture<DevAddPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevAddPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevAddPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
