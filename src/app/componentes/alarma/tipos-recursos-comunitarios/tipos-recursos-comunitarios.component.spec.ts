import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposRecursosComunitariosComponent } from './tipos-recursos-comunitarios.component';

describe('TiposRecursosComunitariosComponent', () => {
  let component: TiposRecursosComunitariosComponent;
  let fixture: ComponentFixture<TiposRecursosComunitariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposRecursosComunitariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposRecursosComunitariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
