import { TestBed } from '@angular/core/testing';

import { CargaUsuariosDelServicioService } from './carga-usuarios-del-servicio.service';

describe('CargaUsuariosDelServicioService', () => {
  let service: CargaUsuariosDelServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaUsuariosDelServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
