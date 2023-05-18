import { TestBed } from '@angular/core/testing';

import { CargaRecursoComunitarioService } from './carga-recurso-comunitario.service';

describe('CargaRecursoComunitarioService', () => {
  let service: CargaRecursoComunitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaRecursoComunitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
