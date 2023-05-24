import { TestBed } from '@angular/core/testing';

import { CargarAgendasResueltasService } from './cargar-agendas-resueltas.service';

describe('CargarAgendasResueltasService', () => {
  let service: CargarAgendasResueltasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarAgendasResueltasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
