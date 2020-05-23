import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload1Component } from './upload1.component';

describe('Upload1Component', () => {
  let component: Upload1Component;
  let fixture: ComponentFixture<Upload1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
