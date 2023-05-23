import { TestBed } from '@angular/core/testing';

import { ConexionWsService } from './conexion-ws.service';

describe('ConexionWsService', () => {
  let service: ConexionWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
