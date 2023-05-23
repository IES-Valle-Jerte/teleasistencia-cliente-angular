import { TestBed } from '@angular/core/testing';

import { ListarelacionterminalrecursocomunitarioService } from './listarelacionterminalrecursocomunitario.service';

describe('ListaViviendasResolveService', () => {
  let service: ListarelacionterminalrecursocomunitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarelacionterminalrecursocomunitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
