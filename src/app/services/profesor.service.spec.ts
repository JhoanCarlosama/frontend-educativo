import { TestBed } from '@angular/core/testing';

import { ProfesorService } from './profesores.service';

describe('ProfesorService', () => {
  let service: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
