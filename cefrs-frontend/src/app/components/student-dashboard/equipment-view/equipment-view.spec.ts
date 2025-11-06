import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentView } from './equipment-view';

describe('EquipmentView', () => {
  let component: EquipmentView;
  let fixture: ComponentFixture<EquipmentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
