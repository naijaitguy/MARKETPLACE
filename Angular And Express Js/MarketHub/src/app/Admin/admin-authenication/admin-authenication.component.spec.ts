import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthenicationComponent } from './admin-authenication.component';

describe('AdminAuthenicationComponent', () => {
  let component: AdminAuthenicationComponent;
  let fixture: ComponentFixture<AdminAuthenicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthenicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthenicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
