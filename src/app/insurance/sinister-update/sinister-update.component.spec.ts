import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterUpdateComponent } from './sinister-update.component';

describe('SinisterUpdateComponent', () => {
  let component: SinisterUpdateComponent;
  let fixture: ComponentFixture<SinisterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinisterUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinisterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
