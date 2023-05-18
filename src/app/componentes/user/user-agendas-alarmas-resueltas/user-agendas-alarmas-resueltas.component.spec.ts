import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgendasAlarmasResueltasComponent } from './user-agendas-alarmas-resueltas.component';

describe('UserAgendasAlarmasResueltasComponent', () => {
  let component: UserAgendasAlarmasResueltasComponent;
  let fixture: ComponentFixture<UserAgendasAlarmasResueltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgendasAlarmasResueltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgendasAlarmasResueltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
