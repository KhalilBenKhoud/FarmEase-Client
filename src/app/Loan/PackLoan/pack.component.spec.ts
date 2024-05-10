import { ComponentFixture, TestBed } from '@angular/core/testing';

import { packComponent } from './pack.component';

describe('packComponent', () => {
  let component: packComponent;
  let fixture: ComponentFixture<packComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ packComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(packComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
