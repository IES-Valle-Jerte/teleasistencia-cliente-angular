import { TestBed } from '@angular/core/testing';

import { CargaTipoRecursoComunitarioService } from './carga-tipo-recurso-comunitario.service';

describe('CargaTipoRecursoComunitarioService', () => {
  let service: CargaTipoRecursoComunitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaTipoRecursoComunitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
