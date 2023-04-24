import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCrearComponent } from './mostrar-crear.component';

describe('MostrarCrearComponent', () => {
  let component: MostrarCrearComponent;
  let fixture: ComponentFixture<MostrarCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
