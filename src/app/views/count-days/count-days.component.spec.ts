import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDaysComponent } from './count-days.component';

describe('CountDaysComponent', () => {
  let component: CountDaysComponent;
  let fixture: ComponentFixture<CountDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
