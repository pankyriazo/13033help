import { TestBed } from '@angular/core/testing';

import { ReducersService } from './reducers.service';

describe('ReducersService', () => {
  let service: ReducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReducersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
