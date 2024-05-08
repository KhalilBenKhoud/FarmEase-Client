import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChnagePasswordComponent } from './chnage-password.component';

describe('ChnagePasswordComponent', () => {
  let component: ChnagePasswordComponent;
  let fixture: ComponentFixture<ChnagePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChnagePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChnagePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
