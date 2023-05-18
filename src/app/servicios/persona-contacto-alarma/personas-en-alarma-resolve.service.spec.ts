import { TestBed } from '@angular/core/testing';

import { PersonasEnAlarmaResolveService } from './personas-en-alarma-resolve.service';

describe('PersonasEnAlarmaResolveService', () => {
  let service: PersonasEnAlarmaResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasEnAlarmaResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
