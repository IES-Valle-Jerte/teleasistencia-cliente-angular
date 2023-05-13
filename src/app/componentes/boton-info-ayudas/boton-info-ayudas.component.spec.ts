import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonInfoAyudasComponent } from './boton-info-ayudas.component';

describe('BotonInfoAyudasComponent', () => {
  let component: BotonInfoAyudasComponent;
  let fixture: ComponentFixture<BotonInfoAyudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonInfoAyudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonInfoAyudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
