import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiListPlansComponent } from './api-list-plans.component';

describe('ApiListPlansComponent', () => {
  let component: ApiListPlansComponent;
  let fixture: ComponentFixture<ApiListPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiListPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiListPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
