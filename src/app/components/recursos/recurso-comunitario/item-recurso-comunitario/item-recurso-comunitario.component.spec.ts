import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRecursoComunitarioComponent } from './item-recurso-comunitario.component';

describe('ItemRecursoComunitarioComponent', () => {
  let component: ItemRecursoComunitarioComponent;
  let fixture: ComponentFixture<ItemRecursoComunitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRecursoComunitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRecursoComunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
