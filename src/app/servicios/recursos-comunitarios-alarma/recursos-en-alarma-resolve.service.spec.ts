import { TestBed } from '@angular/core/testing';

import { RecursosEnAlarmaResolveService } from './recursos-en-alarma-resolve.service';

describe('RecursosEnAlarmaResolveService', () => {
  let service: RecursosEnAlarmaResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosEnAlarmaResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
