import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRecursoComponent } from './ver-recurso.component';

describe('VerRecursoComponent', () => {
  let component: VerRecursoComponent;
  let fixture: ComponentFixture<VerRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerRecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
