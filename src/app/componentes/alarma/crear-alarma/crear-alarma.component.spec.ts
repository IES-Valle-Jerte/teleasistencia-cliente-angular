import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlarmaComponent } from './crear-alarma.component';

describe('CrearAlarmaTerminalComponent', () => {
  let component: CrearAlarmaComponent;
  let fixture: ComponentFixture<CrearAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAlarmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
