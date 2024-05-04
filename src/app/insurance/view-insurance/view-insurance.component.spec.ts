import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceComponent } from './view-insurance.component';

describe('ViewInsuranceComponent', () => {
  let component: ViewInsuranceComponent;
  let fixture: ComponentFixture<ViewInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
