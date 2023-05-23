import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoViviendaComponent } from './nuevo-tipo-vivienda.component';

describe('NuevoTipoViviendaComponent', () => {
  let component: NuevoTipoViviendaComponent;
  let fixture: ComponentFixture<NuevoTipoViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTipoViviendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
