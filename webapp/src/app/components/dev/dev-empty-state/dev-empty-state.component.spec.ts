import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevEmptyStateComponent } from './dev-empty-state.component';

describe('DevEmptyStateComponent', () => {
  let component: DevEmptyStateComponent;
  let fixture: ComponentFixture<DevEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevEmptyStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
