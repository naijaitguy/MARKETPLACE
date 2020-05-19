import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthenticationComponent } from './admin-authentication.component';

describe('AdminAuthenticationComponent', () => {
  let component: AdminAuthenticationComponent;
  let fixture: ComponentFixture<AdminAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
