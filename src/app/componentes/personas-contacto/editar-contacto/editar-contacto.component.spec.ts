import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContactoComponent } from './editar-contacto.component';

describe('EditarContactoComponent', () => {
  let component: EditarContactoComponent;
  let fixture: ComponentFixture<EditarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
