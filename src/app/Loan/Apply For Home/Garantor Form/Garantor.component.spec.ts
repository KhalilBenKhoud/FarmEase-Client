import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantorComponent } from './Garantor.component';


describe('GarantorComponent', () => {
  let component: GarantorComponent;
  let fixture: ComponentFixture<GarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
