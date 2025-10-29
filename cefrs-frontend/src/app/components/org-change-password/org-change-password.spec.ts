import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChangePassword } from './org-change-password';

describe('OrgChangePassword', () => {
  let component: OrgChangePassword;
  let fixture: ComponentFixture<OrgChangePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgChangePassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgChangePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
