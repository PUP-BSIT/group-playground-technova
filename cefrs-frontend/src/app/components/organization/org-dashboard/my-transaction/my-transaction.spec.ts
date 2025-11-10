import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgMyTransactionComponent } from './my-transaction';
import { provideHttpClient } from '@angular/common/http';

describe('OrgMyTransactionComponent', () => {
  let component: OrgMyTransactionComponent;
  let fixture: ComponentFixture<OrgMyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgMyTransactionComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrgMyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

