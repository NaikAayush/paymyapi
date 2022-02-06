import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevAddApiModalComponent } from './dev-add-api-modal.component';

describe('DevAddApiModalComponent', () => {
  let component: DevAddApiModalComponent;
  let fixture: ComponentFixture<DevAddApiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevAddApiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevAddApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
