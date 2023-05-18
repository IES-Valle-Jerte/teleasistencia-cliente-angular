import { TestBed } from '@angular/core/testing';

import { ClasificacionRecursoscomunitariosResolveService } from './clasificacion-recursoscomunitarios-resolve.service';

describe('ClasificacionRecursoscomunitariosResolveService', () => {
  let service: ClasificacionRecursoscomunitariosResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionRecursoscomunitariosResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
