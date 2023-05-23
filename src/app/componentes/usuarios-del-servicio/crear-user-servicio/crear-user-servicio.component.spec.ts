import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUserServicioComponent } from './crear-user-servicio.component';

describe('CrearUserServicioComponent', () => {
  let component: CrearUserServicioComponent;
  let fixture: ComponentFixture<CrearUserServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUserServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUserServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
