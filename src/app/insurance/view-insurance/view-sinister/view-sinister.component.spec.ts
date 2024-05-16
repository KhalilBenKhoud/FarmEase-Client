import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSinisterComponent } from './view-sinister.component';

describe('ViewSinisterComponent', () => {
  let component: ViewSinisterComponent;
  let fixture: ComponentFixture<ViewSinisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSinisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSinisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
