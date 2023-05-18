import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecursoComunitarioComponent } from './crear-recurso-comunitario.component';

describe('NuevoRecursoComunitarioComponent', () => {
  let component: CrearRecursoComunitarioComponent;
  let fixture: ComponentFixture<CrearRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
