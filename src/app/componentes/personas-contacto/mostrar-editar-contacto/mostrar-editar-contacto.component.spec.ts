import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEditarContactoComponent } from './mostrar-editar-contacto.component';

describe('MostrarEditarContactoComponent', () => {
  let component: MostrarEditarContactoComponent;
  let fixture: ComponentFixture<MostrarEditarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarEditarContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarEditarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
