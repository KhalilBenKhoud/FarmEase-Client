import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expensesComponent } from './expenses.component';

describe('expensesComponent', () => {
  let component: expensesComponent;
  let fixture: ComponentFixture<expensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ expensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(expensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
