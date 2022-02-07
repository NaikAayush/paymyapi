import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGenerateTokenComponent } from './api-generate-token.component';

describe('ApiGenerateTokenComponent', () => {
  let component: ApiGenerateTokenComponent;
  let fixture: ComponentFixture<ApiGenerateTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiGenerateTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiGenerateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
