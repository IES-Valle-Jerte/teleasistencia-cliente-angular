import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearViviendaComponent } from './crear-vivienda.component';

describe('NuevaViviendaComponent', () => {
  let component: CrearViviendaComponent;
  let fixture: ComponentFixture<CrearViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearViviendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
