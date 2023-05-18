import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoRecursoComunitarioComponent } from './crear-tipo-recurso-comunitario.component';

describe('NuevoTipoRecursoComunitarioComponent', () => {
  let component: CrearTipoRecursoComunitarioComponent;
  let fixture: ComponentFixture<CrearTipoRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTipoRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
