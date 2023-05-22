import { TestBed } from '@angular/core/testing';

import { ListaTeleoperadorResolveService } from './lista-teleoperador-resolve.service';

describe('ListaTeleoperadorResolveService', () => {
  let service: ListaTeleoperadorResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaTeleoperadorResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
