import { TestBed } from '@angular/core/testing';

import { CargarClasificacionRecursosService } from './cargar-clasificacion-recursos.service';

describe('CargarClasificacionRecursosService', () => {
  let service: CargarClasificacionRecursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarClasificacionRecursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
