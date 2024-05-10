import { TestBed } from '@angular/core/testing';

import { Project2Service } from './project2.service';

describe('Project2Service', () => {
  let service: Project2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Project2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
