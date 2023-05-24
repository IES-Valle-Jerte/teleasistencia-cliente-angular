import { TestBed } from '@angular/core/testing';

import { ListaAgendasResueltasResolveService } from './lista-agendas-resueltas-resolve.service';

describe('ListaAlarmasResueltasResolveService', () => {
  let service: ListaAgendasResueltasResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaAgendasResueltasResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
