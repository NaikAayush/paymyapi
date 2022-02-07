import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiListPlansItemComponent } from './api-list-plans-item.component';

describe('ApiListPlansItemComponent', () => {
  let component: ApiListPlansItemComponent;
  let fixture: ComponentFixture<ApiListPlansItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiListPlansItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiListPlansItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
