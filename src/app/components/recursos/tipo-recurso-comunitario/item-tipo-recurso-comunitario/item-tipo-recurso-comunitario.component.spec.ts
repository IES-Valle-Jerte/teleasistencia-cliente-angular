import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTipoRecursoComunitarioComponent } from './item-tipo-recurso-comunitario.component';

describe('ItemTipoRecursoComunitarioComponent', () => {
  let component: ItemTipoRecursoComunitarioComponent;
  let fixture: ComponentFixture<ItemTipoRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTipoRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTipoRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
