import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload3Component } from './upload3.component';

describe('Upload3Component', () => {
  let component: Upload3Component;
  let fixture: ComponentFixture<Upload3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
