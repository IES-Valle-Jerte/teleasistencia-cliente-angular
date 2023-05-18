import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecursosComunitariosComponent } from './lista-recursos-comunitarios.component';

describe('ListaRecursosComunitariosComponent', () => {
  let component: ListaRecursosComunitariosComponent;
  let fixture: ComponentFixture<ListaRecursosComunitariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRecursosComunitariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecursosComunitariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
