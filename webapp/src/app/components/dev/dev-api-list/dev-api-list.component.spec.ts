import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevApiListComponent } from './dev-api-list.component';

describe('DevApiListComponent', () => {
  let component: DevApiListComponent;
  let fixture: ComponentFixture<DevApiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevApiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevApiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
