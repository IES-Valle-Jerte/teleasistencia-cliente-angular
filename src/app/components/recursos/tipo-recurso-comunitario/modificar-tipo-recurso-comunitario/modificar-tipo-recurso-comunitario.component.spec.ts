import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoRecursoComunitarioComponent } from './modificar-tipo-recurso-comunitario.component';

describe('DetallesTipoRecursoComunitarioComponent', () => {
  let component: ModificarTipoRecursoComunitarioComponent;
  let fixture: ComponentFixture<ModificarTipoRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTipoRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
