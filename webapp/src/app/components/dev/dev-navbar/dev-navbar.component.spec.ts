import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevNavbarComponent } from './dev-navbar.component';

describe('DevNavbarComponent', () => {
  let component: DevNavbarComponent;
  let fixture: ComponentFixture<DevNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
