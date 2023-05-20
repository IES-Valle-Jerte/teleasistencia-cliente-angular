import { TestBed } from '@angular/core/testing';

import { CargaSeguimientoTeleoperadorService } from './carga-seguimiento-teleoperador.service';

describe('CargarSeguimientoTeleoperadorService', () => {
  let service: CargaSeguimientoTeleoperadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaSeguimientoTeleoperadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
