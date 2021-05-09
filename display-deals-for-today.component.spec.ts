import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDealsForTodayComponent } from './display-deals-for-today.component';

describe('DisplayDealsForTodayComponent', () => {
  let component: DisplayDealsForTodayComponent;
  let fixture: ComponentFixture<DisplayDealsForTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDealsForTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDealsForTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
