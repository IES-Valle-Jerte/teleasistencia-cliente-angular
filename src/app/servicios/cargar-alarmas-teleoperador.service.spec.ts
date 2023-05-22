import { TestBed } from '@angular/core/testing';

import { CargarAlarmasTeleoperadorService } from './cargar-alarmas-teleoperador.service';

describe('CargarAlarmasTeleoperadorService', () => {
  let service: CargarAlarmasTeleoperadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarAlarmasTeleoperadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
