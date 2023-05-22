import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTeleoperadorComponent } from './item-teleoperador.component';

describe('ItemTeleoperadorComponent', () => {
  let component: ItemTeleoperadorComponent;
  let fixture: ComponentFixture<ItemTeleoperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTeleoperadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTeleoperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
