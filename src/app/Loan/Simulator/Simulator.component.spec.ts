import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorComponent } from './Simulator.component';


describe('SimulatorComponent ', () => {
  let component: SimulatorComponent ;
  let fixture: ComponentFixture<SimulatorComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
