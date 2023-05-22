import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAlarmasResueltasComponent } from './item-alarmas-resueltas.component';

describe('ItemAlarmasResueltasComponent', () => {
  let component: ItemAlarmasResueltasComponent;
  let fixture: ComponentFixture<ItemAlarmasResueltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAlarmasResueltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAlarmasResueltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
