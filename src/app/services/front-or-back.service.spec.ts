import { TestBed } from '@angular/core/testing';

import { FrontOrBackService } from './front-or-back.service';

describe('FrontOrBackService', () => {
  let service: FrontOrBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontOrBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
