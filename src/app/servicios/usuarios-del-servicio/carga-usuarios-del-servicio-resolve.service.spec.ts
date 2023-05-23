import { TestBed } from '@angular/core/testing';

import { CargaUsuariosDelServicioResolveService } from './carga-usuarios-del-servicio-resolve.service';

describe('CargaUsuariosDelServicioResolveService', () => {
  let service: CargaUsuariosDelServicioResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaUsuariosDelServicioResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
