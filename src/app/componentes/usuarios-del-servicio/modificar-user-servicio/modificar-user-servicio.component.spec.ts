import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUserServicioComponent } from './modificar-user-servicio.component';

describe('ModificarUserServicioComponent', () => {
  let component: ModificarUserServicioComponent;
  let fixture: ComponentFixture<ModificarUserServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarUserServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUserServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
