import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadComponent } from './upload.component';

describe('MortgageComponent', () => {
  let component: uploadComponent;
  let fixture: ComponentFixture<uploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(uploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
