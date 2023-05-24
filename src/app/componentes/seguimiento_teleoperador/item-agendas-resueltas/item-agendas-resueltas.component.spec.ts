import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAgendasResueltasComponent } from './item-agendas-resueltas.component';

describe('ItemAlarmasResueltasComponent', () => {
  let component: ItemAgendasResueltasComponent;
  let fixture: ComponentFixture<ItemAgendasResueltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAgendasResueltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAgendasResueltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
