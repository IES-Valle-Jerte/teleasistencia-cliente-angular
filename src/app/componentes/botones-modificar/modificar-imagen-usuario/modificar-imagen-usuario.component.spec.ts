import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarImagenUsuarioComponent } from './modificar-imagen-usuario.component';

describe('ModificarImagenUsuarioComponent', () => {
  let component: ModificarImagenUsuarioComponent;
  let fixture: ComponentFixture<ModificarImagenUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarImagenUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarImagenUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
