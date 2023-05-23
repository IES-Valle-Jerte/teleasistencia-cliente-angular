import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoViviendaComponent } from './editar-tipo-vivienda.component';

describe('EditarTipoViviendaComponent', () => {
  let component: EditarTipoViviendaComponent;
  let fixture: ComponentFixture<EditarTipoViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoViviendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
