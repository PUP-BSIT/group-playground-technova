import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsView } from './requests-view';

describe('RequestsView', () => {
  let component: RequestsView;
  let fixture: ComponentFixture<RequestsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
