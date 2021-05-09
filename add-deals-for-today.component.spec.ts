import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealsForTodayComponent } from './add-deals-for-today.component';

describe('AddDealsForTodayComponent', () => {
  let component: AddDealsForTodayComponent;
  let fixture: ComponentFixture<AddDealsForTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealsForTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealsForTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
