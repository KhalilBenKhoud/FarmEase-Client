import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbackComponent } from './postback.component';

describe('PostbackComponent', () => {
  let component: PostbackComponent;
  let fixture: ComponentFixture<PostbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
