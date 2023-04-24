import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPersonaContactoComponent } from './crear-persona-contacto.component';

describe('CrearPersonaContactoComponent', () => {
  let component: CrearPersonaContactoComponent;
  let fixture: ComponentFixture<CrearPersonaContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPersonaContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPersonaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
