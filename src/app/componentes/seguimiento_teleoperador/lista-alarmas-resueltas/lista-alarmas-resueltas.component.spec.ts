import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlarmasResueltasComponent } from './lista-alarmas-resueltas.component';

describe('ListaAlarmasResueltasComponent', () => {
  let component: ListaAlarmasResueltasComponent;
  let fixture: ComponentFixture<ListaAlarmasResueltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlarmasResueltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlarmasResueltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
