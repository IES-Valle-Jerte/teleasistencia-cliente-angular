import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPasswordUsuarioComponent } from './modificar-password-usuario.component';

describe('ModificarPasswordUsuarioComponent', () => {
  let component: ModificarPasswordUsuarioComponent;
  let fixture: ComponentFixture<ModificarPasswordUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPasswordUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPasswordUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
