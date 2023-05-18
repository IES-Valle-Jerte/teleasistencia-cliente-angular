import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposRecursosComunitariosComponent } from './lista-tipos-recursos-comunitarios.component';

describe('ListaTiposRecursosComunitariosComponent', () => {
  let component: ListaTiposRecursosComunitariosComponent;
  let fixture: ComponentFixture<ListaTiposRecursosComunitariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTiposRecursosComunitariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiposRecursosComunitariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
