import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosEditarComponent } from './dispositivos-editar.component';

describe('DispositivosEditarComponent', () => {
  let component: DispositivosEditarComponent;
  let fixture: ComponentFixture<DispositivosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositivosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
