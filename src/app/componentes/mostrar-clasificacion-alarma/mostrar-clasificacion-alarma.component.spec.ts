import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarClasificacionAlarmaComponent } from './mostrar-clasificacion-alarma.component';

describe('MostrarClasificacionAlarmaComponent', () => {
  let component: MostrarClasificacionAlarmaComponent;
  let fixture: ComponentFixture<MostrarClasificacionAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarClasificacionAlarmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarClasificacionAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
