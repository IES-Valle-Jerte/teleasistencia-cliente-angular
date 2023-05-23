import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUsersServicioComponent } from './consultar-users-servicio.component';

describe('ConsultarUsersServicioComponent', () => {
  let component: ConsultarUsersServicioComponent;
  let fixture: ComponentFixture<ConsultarUsersServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarUsersServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarUsersServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
