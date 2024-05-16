import { TestBed } from '@angular/core/testing';

import { NonauthGuard } from './nonauth.guard';

describe('NonauthGuard', () => {
  let guard: NonauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
