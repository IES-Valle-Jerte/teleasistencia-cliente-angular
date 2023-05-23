import { TestBed } from '@angular/core/testing';

import { ListaAlarmasResueltasResolveService } from './lista-alarmas-resueltas-resolve.service';

describe('ListaAlarmasResueltasResolveService', () => {
  let service: ListaAlarmasResueltasResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaAlarmasResueltasResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
