import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRecursoComunitarioComponent } from './modificar-recurso-comunitario.component';

describe('DetallesRecursoComunitarioComponent', () => {
  let component: ModificarRecursoComunitarioComponent;
  let fixture: ComponentFixture<ModificarRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
