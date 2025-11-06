import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesView } from './facilities-view';

describe('FacilitiesView', () => {
  let component: FacilitiesView;
  let fixture: ComponentFixture<FacilitiesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
