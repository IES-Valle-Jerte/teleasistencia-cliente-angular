import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDatosSanitariosComponent } from './crear-datos-sanitarios.component';

describe('CrearDatosSanitariosComponent', () => {
  let component: CrearDatosSanitariosComponent;
  let fixture: ComponentFixture<CrearDatosSanitariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDatosSanitariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDatosSanitariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
