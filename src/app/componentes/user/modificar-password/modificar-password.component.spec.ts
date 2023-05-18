import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPasswordComponent } from './modificar-password.component';

describe('ModificarPasswordComponent', () => {
  let component: ModificarPasswordComponent;
  let fixture: ComponentFixture<ModificarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
