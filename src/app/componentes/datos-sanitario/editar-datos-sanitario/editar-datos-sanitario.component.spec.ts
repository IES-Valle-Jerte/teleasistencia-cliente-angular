import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatosSanitarioComponent } from './editar-datos-sanitario.component';

describe('EditarDatosSanitarioComponent', () => {
  let component: EditarDatosSanitarioComponent;
  let fixture: ComponentFixture<EditarDatosSanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDatosSanitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDatosSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
