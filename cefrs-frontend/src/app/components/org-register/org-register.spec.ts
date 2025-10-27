import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRegister } from './org-register';

describe('OrgRegister', () => {
  let component: OrgRegister;
  let fixture: ComponentFixture<OrgRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
