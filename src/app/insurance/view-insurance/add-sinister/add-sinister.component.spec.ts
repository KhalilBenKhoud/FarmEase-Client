import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSinisterComponent } from './add-sinister.component';

describe('AddSinisterComponent', () => {
  let component: AddSinisterComponent;
  let fixture: ComponentFixture<AddSinisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSinisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSinisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
