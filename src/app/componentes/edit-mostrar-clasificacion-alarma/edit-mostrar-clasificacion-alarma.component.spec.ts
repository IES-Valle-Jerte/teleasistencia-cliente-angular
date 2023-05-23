import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMostrarClasificacionAlarmaComponent } from './edit-mostrar-clasificacion-alarma.component';

describe('EditMostrarClasificacionAlarmaComponent', () => {
  let component: EditMostrarClasificacionAlarmaComponent;
  let fixture: ComponentFixture<EditMostrarClasificacionAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMostrarClasificacionAlarmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMostrarClasificacionAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
