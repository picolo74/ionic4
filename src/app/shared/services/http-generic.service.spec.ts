import { TestBed } from '@angular/core/testing';

import { HttpGenericService } from './http-generic.service';

describe('HttpGenericService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpGenericService = TestBed.get(HttpGenericService);
    expect(service).toBeTruthy();
  });
});
